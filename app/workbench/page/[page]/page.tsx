import { GitHubClient, Repository } from "@/lib/github";
import { WorkbenchPost } from "@/lib/types";
import {
  Footer,
  Header,
  PageContainer,
  PaginationWrapper,
  WorkbenchPageBody,
} from "@/ui";
import { notFound } from "next/navigation";

const REPOS: Repository[] = [
  {
    name: "on-chain indexing runtime",
    username: "datafast-network",
    repoName: "datafast-runtime",
  },
  "interactive-consistent-hashing",
  "PyrateLimiter",
  "ETL-Microservices-System-Boilerplate",
];

const POSTS_PER_PAGE = 6;

export default async function WorkbenchPage({
  params,
}: {
  params: { page: string };
}) {
  const currentPage = parseInt(params.page, 10);
  if (isNaN(currentPage) || currentPage < 1) notFound();

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pageRepos = REPOS.slice(start, end);

  if (pageRepos.length === 0) notFound();

  const client = new GitHubClient(process.env.GITHUB_TOKEN);
  const projects: WorkbenchPost[] = await client.fetchRepos(pageRepos);

  const totalPages = Math.ceil(REPOS.length / POSTS_PER_PAGE);

  return (
    <PageContainer>
      <Header currentPath="/workbench" />
      <WorkbenchPageBody projects={projects} />
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/workbench"
      />
      <Footer />
    </PageContainer>
  );
}
