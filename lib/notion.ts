import { BlockObjectResponse, Client } from "@notionhq/client";
import { LogbookPost, LogbookTag } from "./types";

const LOGBOOK_DB_ID = process.env.LOGBOOK_DB_ID!;
const ABOUT_PAGE_ID = process.env.ABOUT_PAGE_ID!;

class NotionClient {
  private static instance: NotionClient;
  private notion = new Client({ auth: process.env.NOTION_TOKEN });
  private fetchedPosts: LogbookPost[] | null = null;
  private fetchedAt: number = 0;
  private ttl = 1000 * 60 * 60; // 1 hour

  private aboutPage: BlockObjectResponse[] | null = null;
  private fetchedAboutAt: number = 0;
  private ttlAboutPage = 1000 * 60 * 60 * 24; // 24 hours

  private constructor() {}

  public static getInstance(): NotionClient {
    if (!NotionClient.instance) {
      NotionClient.instance = new NotionClient();
    }
    return NotionClient.instance;
  }

  async getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
    const blocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await this.notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      blocks.push(...(response.results as BlockObjectResponse[]));
      cursor = response.has_more ? response.next_cursor! : undefined;
    } while (cursor);

    return blocks;
  }

  private async fetchAllPosts(): Promise<LogbookPost[]> {
    if (this.fetchedPosts && Date.now() - this.fetchedAt < this.ttl) {
      return this.fetchedPosts;
    }

    const results: LogbookPost[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await this.notion.databases.query({
        database_id: LOGBOOK_DB_ID,
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: 100,
        start_cursor: cursor,
      });

      for (const item of response.results) {
        const properties = (item as any).properties;
        results.push({
          id: item.id,
          slug: properties.Slug.rich_text[0]?.plain_text || "",
          title: properties.Logbook.title[0]?.plain_text || "Untitled",
          date: new Date(properties.Date.date?.start || Date.now()),
          // @ts-expect-error type arbitrary
          cover: item.cover?.[item.cover?.type]?.url || "",
          description: properties.Excerpt?.rich_text?.[0]?.plain_text ?? "",
          content: undefined,
          tags:
            properties.Tags?.multi_select?.map((tag: any) => tag.name) ?? [],

          comments: parseInt(properties.Comments?.number ?? "0"),
        });
      }

      cursor = response.has_more
        ? (response.next_cursor ?? undefined)
        : undefined;
    } while (cursor);

    this.fetchedPosts = results;
    this.fetchedAt = Date.now();

    return results;
  }

  public async getLatestPosts(limit: number): Promise<LogbookPost[]> {
    const posts = await this.fetchAllPosts();
    return posts.slice(0, limit);
  }

  public async getPaginatedPosts(
    page: number,
    perPage: number = 6,
  ): Promise<LogbookPost[]> {
    const posts = await this.fetchAllPosts();
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return posts.slice(start, end);
  }

  public async getPostBySlug(slug: string): Promise<LogbookPost | undefined> {
    const posts = await this.fetchAllPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return undefined;

    if (post.content) {
      // If content is already fetched, return the post
      return post;
    }

    const blocks = await this.getPageBlocks(post.id);
    post.content = blocks;
    return post;
  }

  public async getPostsByTags(
    tags: string[],
    limit: number,
    excludeSlug?: string,
  ): Promise<LogbookPost[]> {
    const posts = await this.fetchAllPosts();
    return posts
      .filter(
        (p) =>
          tags.some((tag) => p.tags.includes(tag)) && p.slug !== excludeSlug,
      )
      .slice(0, limit);
  }

  public async countPostsByTags(): Promise<LogbookTag[]> {
    const posts = await this.fetchAllPosts();
    const tagMap: Record<string, number> = {};
    for (const post of posts) {
      for (const tag of post.tags) {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      }
    }
    const result = [];
    for (const tag in tagMap) {
      result.push({
        name: tag,
        count: tagMap[tag],
      });
    }
    return result.sort((a, b) => b.count - a.count);
  }

  public async getDatesWithPosts(): Promise<Date[]> {
    const posts = await this.fetchAllPosts();
    const dates = new Set<Date>();
    for (const post of posts) {
      dates.add(new Date(post.date));
    }
    return Array.from(dates).sort((a, b) => b.getTime() - a.getTime());
  }

  public async getPageContentBlocks(pageId: string) {
    const response = await this.notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  }

  public async getAboutPage() {
    if (
      !this.aboutPage ||
      Date.now() - this.fetchedAboutAt > this.ttlAboutPage
    ) {
      this.aboutPage = await this.getPageBlocks(ABOUT_PAGE_ID);
      this.fetchedAboutAt = Date.now();
    }
    return this.aboutPage;
  }
}

export const notionClient = NotionClient.getInstance();

/*
curl https://api.notion.com/v1/pages/2149f991bd5880b29e65d35ac6ca3e31 \
  -H "Authorization: Bearer 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" \
  -H "Notion-Version: 2022-06-28"
*/
