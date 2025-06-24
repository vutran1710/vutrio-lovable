import { GitHubClient, PUBLIC_REPOS } from "@/lib/github";
import { WorkbenchPost } from "@/lib/types";
import {
  Footer,
  Header,
  PageContainer,
  PaginationWrapper,
  WorkbenchPageBody,
} from "@/ui";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 6;

export default async function WorkbenchPage({
  params,
}: {
  params: { page: string };
}) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  if (isNaN(currentPage) || currentPage < 1) notFound();

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pageRepos = PUBLIC_REPOS.slice(start, end);

  if (pageRepos.length === 0) notFound();

  const client = new GitHubClient(process.env.GITHUB_TOKEN);
  const projects: WorkbenchPost[] = await client.fetchRepos(pageRepos);

  const totalPages = Math.ceil(PUBLIC_REPOS.length / POSTS_PER_PAGE);

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
