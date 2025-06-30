import { notionWorkbenchClient } from "@/lib/notion-workbench";
import { incrementPageView } from "@/lib/pageViews";
import { Footer, Header, PageContainer, WorkbenchPageBody } from "@/ui";

export default async function Page() {
  const projects = await notionWorkbenchClient.getWorkbenchPosts();
  await incrementPageView("/workbench");

  return (
    <PageContainer>
      <Header currentPath="/workbench" />
      <WorkbenchPageBody projects={projects} />
      <Footer currentPath="/workbench" />
    </PageContainer>
  );
}
