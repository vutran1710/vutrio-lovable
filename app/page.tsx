import { notionClient } from "@/lib/notion";
import {
  Header,
  PageContainer,
  Hero,
  ContentGrid,
  TagsSection,
  SocialSection,
  Footer,
} from "../ui";
import { notionWorkbenchClient } from "@/lib/notion-workbench";
import { cachedFetchPhotosByPage, PHOTO_FOLDER_NAME } from "@/lib/cloudinary";

export default async function Home() {
  const latestLogbookPosts = await notionClient.getLatestPosts(2);
  const workbenchProjects = await notionWorkbenchClient.getWorkbenchPosts();
  const shootPosts = await cachedFetchPhotosByPage(1, 2, PHOTO_FOLDER_NAME);

  return (
    <PageContainer>
      <Header currentPath="/" />
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
