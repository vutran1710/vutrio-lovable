import {
  PaginationWrapper,
  LogbookPageBody,
  PageContainer,
  Header,
  Footer,
} from "@/ui";
import { notionClient } from "@/lib/notion";
import { getPageViews } from "@/lib/pageViews";
import { LogbookTag } from "@/lib/types";

const POSTS_PER_PAGE = 8;

export default async function LogbookPage({
  params,
}: {
  params: { page: string };
}) {
  const { page } = await params;

  const currentPage = parseInt(page, 10);
  const posts = await notionClient.getPaginatedPosts(
    currentPage,
    POSTS_PER_PAGE,
  );
  const hasNextPage = posts.length === POSTS_PER_PAGE;
  const views = await getPageViews("logbook");
  const tags: Record<string, LogbookTag> = {};
  const dateWithPosts: Set<Date> = new Set();

  for (const post of posts) {
    for (const tag of post.tags) {
      if (!tags[tag]) {
        tags[tag] = { name: tag, count: 0 };
      }
      tags[tag].count += 1;
    }

    if (post.date) {
      dateWithPosts.add(post.date);
    }
  }

  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <LogbookPageBody
        posts={posts}
        stats={{
          totalComments: 0,
          totalViews: views || 0, // Fallback to 0 if views are not available
        }}
        tags={Object.values(tags)}
        recentComments={[]}
        datesWithPosts={Array.from(dateWithPosts)}
      />
      <PaginationWrapper
        currentPage={currentPage}
        basePath="/logbook"
        hasNext={hasNextPage}
      />
      <Footer />
    </PageContainer>
  );
}
