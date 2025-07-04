import { notionDatabaseClient } from "@/lib/notion-db-client";
import { incrementPageView } from "@/lib/pageViews";
import { WorkbenchPost } from "@/lib/types";
import { Footer, TopNav, PageContainer, WorkbenchPageBody } from "@/ui";
import { githubClient } from "@/lib/github";

export default async function Page() {
  const projectsPromise = notionDatabaseClient.paginateBy({
    recordType: "workbench",
    offset: 0,
    limit: 6,
  });
  void incrementPageView("/workbench");
  const { results } = await projectsPromise;
  const projects = await Promise.all(
    results.map(async (project) => {
      if (project.description) return project;
      const updatedProject = await githubClient.fetchRepoDetails(
        project as WorkbenchPost,
      );
      return updatedProject;
    }),
  );

  return (
    <PageContainer>
      <TopNav currentPath="/workbench" />
      <WorkbenchPageBody projects={projects as WorkbenchPost[]} />
      <Footer currentPath="/workbench" />
    </PageContainer>
  );
}
