import type { WorkbenchPost } from "./types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const TTL = 2 * 3600 * 1000; // 2 hour in milliseconds

class GithubClient {
  private static instance: GithubClient;
  private token = GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined;
  private cachedRepoData = new Map<
    string,
    { lastFetched: number; data: WorkbenchPost }
  >();

  private constructor() {}

  public static getInstance(): GithubClient {
    if (!GithubClient.instance) {
      GithubClient.instance = new GithubClient();
    }
    return GithubClient.instance;
  }

  public async fetchRepoDetails(
    item: WorkbenchPost,
  ): Promise<WorkbenchPost | undefined> {
    const cached = this.cachedRepoData.get(item.sourceUrl!);

    if (cached && Date.now() - cached.lastFetched < TTL) {
      return cached.data;
    }

    if (!item.sourceUrl) {
      return item;
    }

    const res = await fetch(
      item.sourceUrl.replace("github.com", "api.github.com/repos"),
      {
        headers: this.token ? { Authorization: this.token } : undefined,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return undefined;

    const data = await res.json();
    const updatedItem = {
      ...item,
      description: data.description ?? "",
      techStack: data.language ? [data.language] : [],
      stars: data.stargazers_count ?? 0,
      date: new Date(data.pushed_at),
    };

    this.cachedRepoData.set(item.sourceUrl!, {
      lastFetched: Date.now(),
      data: updatedItem,
    });

    return updatedItem;
  }
}

export const githubClient = GithubClient.getInstance();
