import { notionDatabaseClient } from "@/lib/notion-db-client";
import { incrementPageView } from "@/lib/pageViews";
import { AboutPageBody, Footer, TopNav, PageContainer } from "@/ui";

export default async function About() {
  const contentPromise = notionDatabaseClient.getAboutPageBlocks();
  void incrementPageView("/about");
  const content = await contentPromise;

  return (
    <PageContainer>
      <TopNav currentPath="/about" />
      <AboutPageBody avatarSrc="/avatar.jpg" name="Vũ Trần" content={content} />
      <Footer currentPath="/about" />
    </PageContainer>
  );
}
