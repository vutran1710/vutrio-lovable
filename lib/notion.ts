import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";
import { LogbookPost } from "./types";
import { withCache } from "./cache";

const notionApi = new NotionAPI();
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const LOGBOOK_DB_ID = process.env.LOGBOOK_DB_ID!;
const ABOUT_PAGE_ID = process.env.ABOUT_PAGE_ID!;

export async function getLogbookEntryBySlug(slug: string) {
  return withCache(`notion:logbook:slug:${slug}`, async () => {
    const response = await notion.databases.query({
      database_id: LOGBOOK_DB_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    return response.results[0];
  });
}

export async function getAllLogbookEntries(): Promise<LogbookPost[]> {
  return withCache("notion:logbook:all", async () => {
    const response = await notion.databases.query({
      database_id: LOGBOOK_DB_ID,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return response.results as unknown as LogbookPost[];
  });
}

export async function getLogbookEntries(
  page: number,
  perPage: number = 6,
): Promise<LogbookPost[]> {
  return withCache(`notion:logbook:page:${page}:limit:${perPage}`, async () => {
    // existing logic unchanged
    const collected = [];
    let cursor: string | undefined = undefined;
    let skipped = 0;
    const offset = (page - 1) * perPage;

    while (collected.length < perPage) {
      const response = await notion.databases.query({
        database_id: LOGBOOK_DB_ID,
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: 8,
        start_cursor: cursor,
      });

      const pageItems = response.results;

      for (const item of pageItems) {
        if (skipped < offset) {
          skipped++;
          continue;
        }

        collected.push(item);
        if (collected.length >= perPage) break;
      }

      if (!response.has_more || !response.next_cursor) break;
      cursor = response.next_cursor;
    }

    return collected.map((item) => {
      // @ts-ignore
      const properties = item.properties!;
      return {
        id: item.id,
        slug: properties.Slug.rich_text[0]?.plain_text || "",
        title: properties.Logbook.title[0]?.plain_text || "Untitled",
        date: new Date(properties.Date.date?.start!),
        // @ts-ignore
        cover: item.cover?.external?.url || "",
        // @ts-ignore
        content: item.content || [],

        // @ts-ignore
        tags: properties.Tags.multi_select.map((tag) => tag.name),
      } as LogbookPost;
    });
  });
}

export async function getPageContentBlocks(pageId: string) {
  return withCache(`notion:blocks:${pageId}`, async () => {
    const response = await notion.blocks.children.list({ block_id: pageId });
    return response.results;
  });
}

export async function getNotionRecordMap(pageId: string) {
  return withCache(`notion:recordMap:${pageId}`, () =>
    notionApi.getPage(pageId),
  );
}

export async function getAboutPage() {
  return withCache(`notion:about:${ABOUT_PAGE_ID}`, () =>
    notionApi.getPage(ABOUT_PAGE_ID),
  );
}
