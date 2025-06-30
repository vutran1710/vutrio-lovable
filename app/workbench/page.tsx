import { notionWorkbenchClient } from "@/lib/notion-workbench";
import { Footer, Header, PageContainer, WorkbenchPageBody } from "@/ui";

export default async function Page() {
  const projects = await notionWorkbenchClient.getWorkbenchPosts();

  return (
    <PageContainer>
      <Header currentPath="/workbench" />
      <WorkbenchPageBody projects={projects} />
      <Footer currentPath="/workbench" />
    </PageContainer>
  );
}
