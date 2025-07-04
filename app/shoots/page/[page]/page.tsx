import { TiktokCollections } from "@/lib/collections";
import { incrementPageView } from "@/lib/pageViews";
import {
  Footer,
  TopNav,
  PageContainer,
  PaginationWrapper,
  ShootsPageBody,
} from "@/ui";
import { notFound } from "next/navigation";
import { notionDatabaseClient } from "@/lib/notion-db-client";
import { ShootPost } from "@/lib/types";

const SHOOT_PER_PAGE = 9;

export default async function ShootPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 1) return notFound();

  const shoots = await notionDatabaseClient.paginateBy({
    postType: "shoots",
    offset: (currentPage - 1) * SHOOT_PER_PAGE,
    limit: SHOOT_PER_PAGE,
  });

  void incrementPageView("/shoots");

  return (
    <PageContainer>
      <TopNav currentPath="/shoots" />
      <ShootsPageBody content={shoots.results as ShootPost[]} />
      <PaginationWrapper
        currentPage={currentPage}
        basePath="/shoots"
        totalPages={shoots.total}
      />
      <Footer currentPath="/shoots" />
    </PageContainer>
  );
}
