import {
  PaginationWrapper,
  LogbookPageBody,
  PageContainer,
  TopNav,
  Footer,
} from "@/ui";
import { notionDatabaseClient } from "@/lib/notion-db-client";
import { getPageViews, incrementPageView } from "@/lib/pageViews";
import { notFound } from "next/navigation";
import { LogbookPost } from "@/lib/types";

const POSTS_PER_PAGE = 8;

export default async function LogbookPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const currentPage = parseInt(page, 10);
  const data = await notionDatabaseClient.paginateBy({
    recordType: "logbook",
    offset: (currentPage - 1) * POSTS_PER_PAGE,
    limit: POSTS_PER_PAGE,
  });

  if (!data || !data.results?.length) {
    return notFound();
  }

  const [views, tags, dateWithPosts] = await Promise.all([
    getPageViews("logbook"),
    notionDatabaseClient.getTagsAndCountByType("logbook"),
    notionDatabaseClient.getDatesWithPost("logbook"),
  ]);

  const totalPage = Math.ceil(data.total / POSTS_PER_PAGE);
  void incrementPageView("/logbook");

  return (
    <PageContainer>
      <TopNav currentPath="/logbook" />
      <LogbookPageBody
        posts={data.results as LogbookPost[]}
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
        totalPages={totalPage}
      />
      <Footer currentPath="/logbook" />
    </PageContainer>
  );
}
