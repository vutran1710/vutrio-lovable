import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from 'notion-client';
import { LogbookEntry } from '@/types/logbook';

const notionApi = new NotionAPI();
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const LOGBOOK_DB_ID = process.env.LOGBOOK_DB_ID!;
const ABOUT_PAGE_ID = process.env.ABOUT_PAGE_ID!;

export async function getLogbookEntries(): Promise<
  QueryDatabaseResponse['results']
> {
  const response = await notion.databases.query({
    database_id: LOGBOOK_DB_ID,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results;
}

export async function getLogbookEntryBySlug(slug: string) {
  const response = await notion.databases.query({
    database_id: LOGBOOK_DB_ID,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  console.log('getLogbookEntryBySlug response:', response);

  return response.results[0]; // first match
}

export async function getPageContentBlocks(pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}

export async function getNotionRecordMap(pageId: string) {
  return await notionApi.getPage(pageId);
}

export async function getAllLogbookEntries(): Promise<LogbookEntry[]> {
  const response = await notion.databases.query({
    database_id: LOGBOOK_DB_ID,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results as LogbookEntry[];
}

export async function getAboutPage() {
  return notionApi.getPage(ABOUT_PAGE_ID);
}
