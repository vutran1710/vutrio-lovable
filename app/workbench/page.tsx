import { notionWorkbenchClient } from "@/lib/notion-workbench";
import { incrementPageView } from "@/lib/pageViews";
import { Footer, TopNav, PageContainer, WorkbenchPageBody } from "@/ui";

export default async function Page() {
  const projectsPromise = notionWorkbenchClient.getWorkbenchPosts();
  void incrementPageView("/workbench");
  const projects = await projectsPromise;

  return (
    <PageContainer>
      <TopNav currentPath="/workbench" />
      <WorkbenchPageBody projects={projects} />
      <Footer currentPath="/workbench" />
    </PageContainer>
  );
}
