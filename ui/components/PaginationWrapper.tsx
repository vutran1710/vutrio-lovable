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
  totalPages: number;
  basePath: string; // required now
}

export const PaginationWrapper = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationWrapperProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | "...")[] => {
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

  const makeHref = (page: number) => `${basePath}/${page}`;

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

          {visiblePages.map((page, index) => (
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
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
