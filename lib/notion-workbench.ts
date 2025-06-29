import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { WorkbenchPost } from "./types";

const WORKBENCH_DB_ID = process.env.WORKBENCH_DB_ID!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export interface WorkbenchItem {
  id: string;
  title: string;
  url: string;
  cover: string;
}

class NotionWorkbenchClient {
  private static instance: NotionWorkbenchClient;
  private notion = new Client({ auth: process.env.NOTION_TOKEN });
  private cachedItems: WorkbenchItem[] | null = null;
  private fetchedAt = 0;
  private ttl = 1000 * 60 * 60; // 1 hour
  private token = GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined;

  private constructor() {}

  public static getInstance(): NotionWorkbenchClient {
    if (!NotionWorkbenchClient.instance) {
      NotionWorkbenchClient.instance = new NotionWorkbenchClient();
    }
    return NotionWorkbenchClient.instance;
  }

  private async fetchAllItems(): Promise<WorkbenchItem[]> {
    if (this.cachedItems && Date.now() - this.fetchedAt < this.ttl) {
      return this.cachedItems;
    }

    const results: WorkbenchItem[] = [];
    let cursor: string | undefined;

    do {
      const response = await this.notion.databases.query({
        database_id: WORKBENCH_DB_ID,
        start_cursor: cursor,
        page_size: 100,
      });

      for (const page of response.results as PageObjectResponse[]) {
        const props = page.properties as any;

        results.push({
          id: page.id,
          title: props.Title?.title?.[0]?.plain_text || "Untitled",
          url: props.url?.url || "",
          // @ts-ignore
          cover: props.cover?.[props.cover.type][0]?.file?.url || "",
        });
      }

      cursor = response.has_more
        ? (response.next_cursor ?? undefined)
        : undefined;
    } while (cursor);

    this.cachedItems = results;
    this.fetchedAt = Date.now();
    return results;
  }

  private formatTitle(name: string): string {
    return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  private async fetchRepo(
    item: WorkbenchItem,
  ): Promise<WorkbenchPost | undefined> {
    const res = await fetch(
      item.url.replace("github.com", "api.github.com/repos"),
      {
        headers: this.token ? { Authorization: this.token } : undefined,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return undefined;

    const data = await res.json();

    return {
      id: data.id.toString(),
      title: this.formatTitle(data.name),
      description: data.description ?? "",
      coverImage: item.cover || "",
      githubUrl: item.url,
      techStack: data.language ? [data.language] : [],
      tags: data.topics ?? [],
      stars: data.stargazers_count ?? 0,
      date: new Date(data.pushed_at),
    };
  }

  public async getWorkbenchPosts(): Promise<WorkbenchPost[]> {
    const items = await this.fetchAllItems();
    const posts: WorkbenchPost[] = [];

    for (const item of items) {
      const post = await this.fetchRepo(item);
      if (post) posts.push(post);
    }

    return posts;
  }
}

export const notionWorkbenchClient = NotionWorkbenchClient.getInstance();
