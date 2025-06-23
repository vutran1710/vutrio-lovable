import { WorkbenchPost } from "./types";

const GITHUB_USERNAME = "vutran1710";
const GITHUB_API = "https://api.github.com";

export type Repository =
  | string
  | { name: string; username: string; repoName: string };

export class GitHubClient {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  public async fetchRepos(repos: Repository[]): Promise<WorkbenchPost[]> {
    const results = await Promise.all(repos.map((r) => this.fetchRepo(r)));
    return results.filter(Boolean) as WorkbenchPost[];
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
      githubUrl: url!,
      techStack: data.language ? [data.language] : [],
      tags: data.topics ?? [],
      stars: data.stargazers_count ?? 0,
    };
  }

  private formatTitle(name: string): string {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }
}
