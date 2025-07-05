import { TopNav, PageContainer, Hero, TagsSection, Footer } from "../ui";
import { notionDatabaseClient } from "@/lib/notion-db-client";
import { incrementPageView } from "@/lib/pageViews";
import { LogbookPost, ShootPost, WorkbenchPost } from "@/lib/types";

export default async function Home() {
  await notionDatabaseClient.ensureLoaded();
  const [latestLogbookPosts, workbenchProjects, shootPosts, tags] =
    await Promise.all([
      notionDatabaseClient.paginateBy({
        recordType: "logbook",
        offset: 0,
        limit: 2,
      }),
      notionDatabaseClient.paginateBy({
        recordType: "workbench",
        offset: 0,
        limit: 2,
      }),
      notionDatabaseClient.paginateBy({
        recordType: "shoots",
        offset: 0,
        limit: 2,
      }),
      notionDatabaseClient.popularTags(10),
    ]);
  void incrementPageView("/");

  return (
    <PageContainer>
      <TopNav currentPath="/" />
      <main>
        <Hero
          logbookPosts={latestLogbookPosts.results as LogbookPost[]}
          shootPosts={shootPosts.results as ShootPost[]}
          workbenchPost={workbenchProjects.results as WorkbenchPost[]}
        />
        {/* <ContentGrid /> */}
        <TagsSection tags={tags} />
        {/* <SocialSection /> */}
      </main>
      <Footer currentPath="/" />
    </PageContainer>
  );
}
