"use client";

import { PaginationWrapper, LogbookPageBody } from "@/ui";
import {
  logbookPosts,
  logbookStats,
  logbookTags,
  recentComments,
  datesWithPosts,
} from "@/lib/mocks";
import { notFound, useSearchParams } from "next/navigation";

const POSTS_PER_PAGE = 5;

function getPageParam(): number {
  const params = useSearchParams();
  const page = params.get("page");
  const pageNumber = parseInt(page || "1", 10);
  return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
}

export default function Logbook() {
  const currentPage = getPageParam();
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const paginatedContent = logbookPosts.slice(start, end);
  const totalPages = Math.ceil(logbookPosts.length / POSTS_PER_PAGE);

  // Edge case: page param exceeds available pages
  if (currentPage > totalPages) notFound();

  return (
    <>
      <LogbookPageBody
        posts={paginatedContent}
        stats={logbookStats}
        tags={logbookTags}
        recentComments={recentComments}
        datesWithPosts={datesWithPosts}
      />
      <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
