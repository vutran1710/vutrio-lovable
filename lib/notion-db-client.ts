import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { LogbookPost, ShootPost, WorkbenchPost } from "./types";

const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const SHOOTS_DB_ID = process.env.SHOOTS_DB_ID!;
const LOGBOOK_DB_ID = process.env.LOGBOOK_DB_ID!;
const WORKBENCH_DB_ID = process.env.WORKBENCH_DB_ID!;

export type SourceType = "logbook" | "shoots" | "workbench";

export type CacheEntry = LogbookPost | ShootPost | WorkbenchPost;

export class NotionDatabaseClient {
  private static instance: NotionDatabaseClient;
  private notion = new Client({ auth: NOTION_TOKEN });
  private cache: Record<SourceType, CacheEntry[]> = {
    logbook: [],
    shoots: [],
    workbench: [],
  };
  private tagIndex: Map<string, Record<SourceType, CacheEntry[]>> = new Map();
  private fetchedAt = 0;
  private ttl = 1000 * 60 * 60; // 1 hour

  private constructor() {}

  public static getInstance(): NotionDatabaseClient {
    if (!NotionDatabaseClient.instance) {
      NotionDatabaseClient.instance = new NotionDatabaseClient();
    }
    return NotionDatabaseClient.instance;
  }

  public async findPostsByTags(
    tags: string[],
    sourceType?: SourceType,
  ): Promise<Record<SourceType, CacheEntry[]>> {
    await this.ensureLoaded();
    const results: Record<SourceType, CacheEntry[]> = {
      logbook: [],
      shoots: [],
      workbench: [],
    };
    const lowerTags = tags.map((tag) => tag.toLowerCase());
    for (const tag of lowerTags) {
      const entry = this.tagIndex.get(tag);
      if (!entry) continue;
      if (sourceType) {
        results[sourceType] = results[sourceType].concat(
          entry[sourceType] || [],
        );
      } else {
        results.logbook = results.logbook.concat(entry.logbook || []);
        results.shoots = results.shoots.concat(entry.shoots || []);
        results.workbench = results.workbench.concat(entry.workbench || []);
      }
    }
    // Remove duplicates
    for (const type of Object.keys(results) as SourceType[]) {
      const seen = new Set<string>();
      results[type] = results[type].filter((post) => {
        const id = post.id.toString();
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    }
    return results;
  }

  public async popularTags(limit: number): Promise<string[]> {
    await this.ensureLoaded();
    const counts = new Map<string, number>();
    for (const [tag, sources] of this.tagIndex.entries()) {
      const count =
        (sources.logbook?.length || 0) +
        (sources.shoots?.length || 0) +
        (sources.workbench?.length || 0);
      counts.set(tag, count);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag]) => tag);
  }

  public async postCountByTags(
    tags: string[],
    type: SourceType,
  ): Promise<Map<string, number>> {
    await this.ensureLoaded();
    const counts = new Map<string, number>();
    for (const tag of tags) {
      const entry = this.tagIndex.get(tag.toLowerCase());
      if (entry && entry[type]) {
        counts.set(tag, entry[type].length);
      }
    }
    return counts;
  }

  public async findPostBySlug(
    slug: string,
    type: SourceType,
  ): Promise<CacheEntry | undefined> {
    await this.ensureLoaded();
    const lowerSlug = slug.toLowerCase();
    for (const post of this.cache[type]) {
      if ((post as any).slug?.toLowerCase() === lowerSlug) {
        return post;
      }
    }
    return undefined;
  }

  public async getTagsAndCountByType(
    type: SourceType,
  ): Promise<Map<string, number>> {
    await this.ensureLoaded();
    const counts = new Map<string, number>();
    for (const entry of this.cache[type]) {
      for (const tag of entry.tags || []) {
        const lowerTag = tag.toLowerCase();
        counts.set(lowerTag, (counts.get(lowerTag) || 0) + 1);
      }
    }
    return counts;
  }

  public async getDatesWithPost(type: SourceType): Promise<Date[]> {
    await this.ensureLoaded();
    const dates = new Set<Date>();
    for (const post of this.cache[type]) {
      if (post.date) {
        dates.add(new Date(post.date));
      }
    }
    return Array.from(dates).sort((a, b) => a.getTime() - b.getTime());
  }

  public async countBy({
    recordType,
    tag,
  }: {
    recordType?: SourceType;
    tag?: string;
  }): Promise<number> {
    await this.ensureLoaded();
    let count = 0;

    if (tag) {
      const lowerTag = tag.toLowerCase();
      const entry = this.tagIndex.get(lowerTag);
      if (!entry) return 0;
      if (recordType) {
        count = entry[recordType]?.length || 0;
      } else {
        count =
          (entry.logbook?.length || 0) +
          (entry.shoots?.length || 0) +
          (entry.workbench?.length || 0);
      }
    } else if (recordType) {
      count = this.cache[recordType]?.length || 0;
    } else {
      count =
        (this.cache.logbook?.length || 0) +
        (this.cache.shoots?.length || 0) +
        (this.cache.workbench?.length || 0);
    }

    return count;
  }

  public async paginateBy({
    recordType,
    tag,
    offset,
    limit,
  }: {
    recordType?: SourceType;
    tag?: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; results: CacheEntry[] }> {
    await this.ensureLoaded();

    let pool: CacheEntry[] = [];
    if (tag) {
      const entry = this.tagIndex.get(tag.toLowerCase());
      if (!entry) return { total: 0, results: [] };
      if (recordType) {
        pool = entry[recordType] || [];
      } else {
        pool = [...entry.logbook, ...entry.shoots, ...entry.workbench];
      }
    } else if (recordType) {
      pool = this.cache[recordType] || [];
    } else {
      pool = [
        ...this.cache.logbook,
        ...this.cache.shoots,
        ...this.cache.workbench,
      ];
    }

    return {
      total: pool.length,
      results: pool.slice(offset, offset + limit),
    };
  }

  public async search(
    query: string,
  ): Promise<Record<SourceType, CacheEntry[]>> {
    await this.ensureLoaded();
    const q = query.toLowerCase();
    const result: Record<SourceType, CacheEntry[]> = {
      logbook: [],
      shoots: [],
      workbench: [],
    };

    for (const type of ["logbook", "shoots", "workbench"] as const) {
      result[type] = this.cache[type].filter((entry) => {
        const title = (entry as any).title || (entry as any).caption || "";
        const slug = (entry as any).slug || "";
        return (
          title.toLowerCase().includes(q) || slug.toLowerCase().includes(q)
        );
      });
    }

    return result;
  }

  public async ensureLoaded() {
    if (Date.now() - this.fetchedAt < this.ttl && this.cache.logbook.length) {
      return;
    }
    await Promise.all([
      this.loadLogbook(),
      this.loadShoots(),
      this.loadWorkbench(),
    ]);
    this.tagIndex.clear();
    for (const type of ["logbook", "shoots", "workbench"] as const) {
      for (const post of this.cache[type]) {
        for (const tag of post.tags || []) {
          const key = tag.toLowerCase();
          if (!this.tagIndex.has(key)) {
            this.tagIndex.set(key, { logbook: [], shoots: [], workbench: [] });
          }
          this.tagIndex.get(key)![type].push(post);
        }
      }
    }
    this.fetchedAt = Date.now();
  }

  private async loadShoots(): Promise<void> {
    const pages = await this.queryAll(SHOOTS_DB_ID);
    this.cache.shoots = pages.map((p) => {
      const props = p.properties as any;

      return {
        id: this.hashId(p.id).toString(),
        title: props["Title"]?.title?.[0]?.plain_text ?? "Untitled",
        description: props["Description"]?.rich_text?.[0]?.plain_text ?? "",
        slug: props["Slug"]?.rich_text?.[0]?.plain_text ?? "",
        cover: props["Thumbnail"]?.files?.[0]?.file?.url ?? "",
        image: props["Image"]?.files?.[0]?.file?.url,
        sourceUrl: props["Link"]?.url ?? undefined,
        recordType: "shoots",
        likes: 0,
        date: new Date(props["Date"]?.date?.start || p.created_time),
        type: props["Type"]?.select?.name?.toLowerCase() ?? "tiktok",
        tags: (props["Tags"]?.multi_select || []).map((t: any) => t.name),
      } satisfies ShootPost;
    });
  }

  private async loadLogbook(): Promise<void> {
    const pages = await this.queryAll(LOGBOOK_DB_ID);
    this.cache.logbook = pages.map((p) => {
      const props = p.properties as any;
      return {
        id: p.id,
        title: props["Title"]?.title?.[0]?.plain_text ?? "Untitled",
        description:
          props["Description"]?.rich_text?.[0]?.plain_text ?? "Untitled",
        slug: props["Slug"]?.rich_text?.[0]?.plain_text ?? "",
        recordType: "logbook",
        // @ts-expect-error type arbitrary
        cover: p.cover?.[p.cover?.type]?.url || "",
        sourceUrl: undefined,
        tags: (props["Tags"]?.multi_select || []).map((t: any) => t.name),
        date: new Date(props["Date"]?.date?.start || p.created_time),
        comments: 0,
      } satisfies LogbookPost;
    });
  }

  private async loadWorkbench(): Promise<void> {
    const pages = await this.queryAll(WORKBENCH_DB_ID);
    this.cache.workbench = pages.map((p) => {
      const props = p.properties as any;
      return {
        id: this.hashId(p.id).toString(),
        title: props["Title"]?.title?.[0]?.plain_text ?? "Untitled",
        description: "",
        slug: "",
        recordType: "workbench",
        cover: props["Cover"]?.files?.[0]?.file?.url ?? "",
        sourceUrl: props["Url"]?.url ?? undefined,
        tags: (props["Tags"]?.multi_select || []).map((t: any) => t.name),
        techStack: [],
        stars: 0,
        date: new Date(p.created_time),
      } satisfies WorkbenchPost;
    });
  }

  private async queryAll(databaseId: string): Promise<PageObjectResponse[]> {
    let results: PageObjectResponse[] = [];
    let cursor: string | undefined;
    do {
      const response = await this.notion.databases.query({
        database_id: databaseId,
        start_cursor: cursor,
        page_size: 100,
      });
      results = results.concat(
        response.results.filter(
          (r): r is PageObjectResponse => r.object === "page",
        ),
      );
      cursor = response.has_more
        ? (response.next_cursor ?? undefined)
        : undefined;
    } while (cursor);
    return results;
  }

  private hashId(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  public async getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
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

    // update to cache
    if (this.cache.logbook.length) {
      const post: LogbookPost | undefined = this.cache.logbook.find(
        (p) => p.id === pageId,
      );
      if (post) {
        post.content = blocks;
      }
    }

    return blocks;
  }

  public async getAboutPageBlocks(): Promise<BlockObjectResponse[]> {
    const aboutPageId = process.env.ABOUT_PAGE_ID!;
    if (!aboutPageId) {
      throw new Error("ABOUT_PAGE_ID environment variable is not set");
    }
    return this.getPageBlocks(aboutPageId);
  }
}

export const notionDatabaseClient = NotionDatabaseClient.getInstance();
