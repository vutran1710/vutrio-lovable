import { notionClient } from "@/lib/notion";
import {
  TopNav,
  PageContainer,
  Hero,
  ContentGrid,
  TagsSection,
  SocialSection,
  Footer,
} from "../ui";
import { notionWorkbenchClient } from "@/lib/notion-workbench";
import { cachedFetchPhotosByPage, PHOTO_FOLDER_NAME } from "@/lib/cloudinary";
import { incrementPageView } from "@/lib/pageViews";

export default async function Home() {
  const [latestLogbookPosts, workbenchProjects, shootPosts] = await Promise.all([
    notionClient.getLatestPosts(2),
    notionWorkbenchClient.getWorkbenchPosts(),
    cachedFetchPhotosByPage(1, 2, PHOTO_FOLDER_NAME),
  ]);
  void incrementPageView("/");

  return (
    <PageContainer>
      <TopNav currentPath="/" />
      <main>
        <Hero
          logbookPosts={latestLogbookPosts}
          shootPosts={shootPosts}
          workbenchPost={workbenchProjects.slice(0, 2)}
        />
        <ContentGrid />
        <TagsSection />
        <SocialSection />
      </main>
      <Footer currentPath="/" />
    </PageContainer>
  );
}
