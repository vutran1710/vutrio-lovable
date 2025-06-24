"use client";

import { PaginationWrapper, ShootsPageBody } from "@/ui";
import { notFound, useSearchParams } from "next/navigation";
import { TiktokCollections } from "@/lib/collections";

const POSTS_PER_PAGE = 6;

function getPageParam(): number {
  const params = useSearchParams();
  const page = params.get("page");
  const pageNumber = parseInt(page || "1", 10);
  return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
}

export default function Shoots() {
  const currentPage = getPageParam();
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const shootsContent = TiktokCollections;

  const paginatedContent = shootsContent.slice(start, end);
  const totalPages = Math.ceil(shootsContent.length / POSTS_PER_PAGE);

  // Edge case: page param exceeds available pages
  if (currentPage > totalPages) notFound();

  return (
    <>
      <ShootsPageBody content={paginatedContent} />
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/shoots"
      />
    </>
  );
}
