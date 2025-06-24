import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../primitives/pagination";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages?: number;
  basePath: string;
  hasNext?: boolean; // only used if totalPages is undefined
}

export const PaginationWrapper = ({
  currentPage,
  totalPages,
  basePath,
  hasNext = true,
}: PaginationWrapperProps) => {
  const makeHref = (page: number) => `${basePath}/page/${page}`;

  const getVisiblePages = (): (number | "...")[] => {
    if (!totalPages) return [];
    const delta = 2;
    const range: (number | "...")[] = [];

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) range.push(1, "...");
    else range.push(1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    if (rangeEnd < totalPages - 1) range.push("...", totalPages);
    else if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const visiblePages = getVisiblePages();

  // If totalPages is known and only 1 page, skip entirely
  if (totalPages === 1) return null;

  return (
    <div className="mt-12 mb-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={makeHref(currentPage - 1)}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {visiblePages.length > 0 &&
            visiblePages.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={makeHref(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              href={makeHref(currentPage + 1)}
              className={
                totalPages
                  ? currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                  : hasNext
                    ? "cursor-pointer"
                    : "pointer-events-none opacity-50"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
