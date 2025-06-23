import {
  PaginationWrapper,
  LogbookPageBody,
  PageContainer,
  Header,
  Footer,
} from "@/ui";
import { getLogbookEntries } from "@/lib/notion";
import { getPageViews } from "@/lib/pageViews";

const POSTS_PER_PAGE = 8;

export default async function LogbookPage({
  params,
}: {
  params: { page: string };
}) {
  const { page } = await params;

  const currentPage = parseInt(page, 10);
  const posts = await getLogbookEntries(currentPage, POSTS_PER_PAGE);
  const hasNextPage = posts.length === POSTS_PER_PAGE;
  const views = await getPageViews("logbook");
  console.log("Post", posts);

  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <LogbookPageBody
        posts={posts}
        stats={{
          totalComments: 0,
          totalViews: views || 0, // Fallback to 0 if views are not available
        }}
        tags={[]}
        recentComments={[]}
        datesWithPosts={[]}
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
