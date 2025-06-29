import { WorkbenchPost } from "./types";

const GITHUB_USERNAME = "vutran1710";
const GITHUB_API = "https://api.github.com";

export const PUBLIC_REPOS: Repository[] = [
  {
    name: "on-chain indexing runtime",
    username: "datafast-network",
    repoName: "datafast-runtime",
  },
  "interactive-consistent-hashing",
  "PyrateLimiter",
  "ETL-Microservices-System-Boilerplate",
  "KafkaOffShore",
];

export type Repository =
  | string
  | { name: string; username: string; repoName: string };

export class GitHubClient {
  private token?: string;
  private fetchedRepos: Map<string, WorkbenchPost> = new Map();

  constructor(token?: string) {
    this.token = token;
  }

  public async fetchRepos(repos: Repository[]): Promise<WorkbenchPost[]> {
    const cachedRepos = [];
    const repoKey = (repo: Repository) =>
      typeof repo === "string"
        ? `${GITHUB_USERNAME}/${repo}`
        : `${repo.username}/${repo.repoName}`;

    const notCachedRepos: Repository[] = [];

    for (const repo of repos) {
      const currentKey = repoKey(repo);
      if (this.fetchedRepos.has(currentKey)) {
        cachedRepos.push(this.fetchedRepos.get(currentKey)!);
      } else {
        notCachedRepos.push(repo);
      }
    }

    if (cachedRepos.length === repos.length) {
      // All repos are cached
      return cachedRepos as WorkbenchPost[];
    }

    const results = await Promise.all(
      notCachedRepos.map((r) => this.fetchRepo(r)),
    );
    const fetchedRepos = results.filter(Boolean) as WorkbenchPost[];
    fetchedRepos.forEach((post) => {
      if (post) {
        this.fetchedRepos.set(post.githubUrl, post);
      }
    });

    return [...cachedRepos, ...fetchedRepos];
  }

  private async fetchRepo(repo: Repository): Promise<WorkbenchPost | null> {
    let url: string;

    if (typeof repo === "string") {
      url = `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}`;
    } else if (typeof repo === "object" && repo.username && repo.repoName) {
      url = `${GITHUB_API}/repos/${repo.username}/${repo.repoName}`;
    }

    const res = await fetch(url!, {
      headers: this.token
        ? { Authorization: `token ${this.token}` }
        : undefined,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      id: data.id,
      title: this.formatTitle(data.name),
      description: data.description ?? "",
      coverImage: "/placeholder.svg", // Customize per-repo if needed
      githubUrl: data.svn_url,
      techStack: data.language ? [data.language] : [],
      tags: data.topics ?? [],
      stars: data.stargazers_count ?? 0,
      date: new Date(data.pushed_at),
    };
  }

  private formatTitle(name: string): string {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }
}
