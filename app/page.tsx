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

export default async function Home() {
  const latestLogbookPosts = await getLogbookEntries(1, 1);
  const client = new GitHubClient(process.env.GITHUB_TOKEN);
  const workbenchProjects = await client.fetchRepos(PUBLIC_REPOS.slice(0, 2));
  console.log("Workbench Projects:", workbenchProjects);

  return (
    <PageContainer>
      <Header currentPath="/" />
      <main>
        <Hero
          logbookPosts={latestLogbookPosts}
          shootPosts={[]}
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
