import { getLogbookEntries } from "@/lib/notion";
import {
  Header,
  PageContainer,
  Hero,
  ContentGrid,
  TagsSection,
  SocialSection,
  Footer,
} from "../ui";
import { GitHubClient, PUBLIC_REPOS } from "@/lib/github";
import { cachedFetchPhotosByPage, PHOTO_FOLDER_NAME } from "@/lib/cloudinary";

export default async function Home() {
  const latestLogbookPosts = await getLogbookEntries(1, 1);
  const client = new GitHubClient(process.env.GITHUB_TOKEN);
  const workbenchProjects = await client.fetchRepos(PUBLIC_REPOS.slice(0, 2));
  const shootPosts = await cachedFetchPhotosByPage(1, 2, PHOTO_FOLDER_NAME);

  return (
    <PageContainer>
      <Header currentPath="/" />
      <main>
        <Hero
          logbookPosts={latestLogbookPosts}
          shootPosts={shootPosts}
          workbenchPost={workbenchProjects}
        />
        <ContentGrid />
        <TagsSection />
        <SocialSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
