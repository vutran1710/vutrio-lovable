import {
  PaginationWrapper,
  LogbookPageBody,
  PageContainer,
  TopNav,
  Footer,
} from "@/ui";
import { notionClient } from "@/lib/notion";
import { getPageViews, incrementPageView } from "@/lib/pageViews";

const POSTS_PER_PAGE = 8;

export default async function LogbookPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const currentPage = parseInt(page, 10);
  const [posts, views, tags, dateWithPosts] = await Promise.all([
    notionClient.getPaginatedPosts(currentPage, POSTS_PER_PAGE),
    getPageViews("logbook"),
    notionClient.countPostsByTags(),
    notionClient.getDatesWithPosts(),
  ]);
  const hasNextPage = posts.length === POSTS_PER_PAGE;
  void incrementPageView("/logbook");

  return (
    <PageContainer>
      <TopNav currentPath="/logbook" />
      <LogbookPageBody
        posts={posts}
        stats={{
          totalComments: 0,
          totalViews: views || 0, // Fallback to 0 if views are not available
        }}
        tags={tags}
        recentComments={[]}
        datesWithPosts={dateWithPosts}
      />
      <PaginationWrapper
        currentPage={currentPage}
        basePath="/logbook"
        hasNext={hasNextPage}
      />
      <Footer currentPath="/logbook" />
    </PageContainer>
  );
}
