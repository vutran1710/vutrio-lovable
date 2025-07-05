import Link from "next/link";
import { PageMain } from "./PageMain";
import { SearchResultItem } from "./SearchResultItem";
import { BaseRecord } from "@/lib/types";

export interface SearchPageBodyProps {
  paginatedResults: BaseRecord[];
  allResultsLength: number;
  searchTitle: string;
}

export function SearchPageBody({
  paginatedResults,
  allResultsLength,
  searchTitle,
}: SearchPageBodyProps) {
  return (
    <PageMain>
      <div className="py-12 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4 text-center">
            {searchTitle}
          </h1>
          <p className="font-serif text-lg text-muted-foreground text-center">
            {allResultsLength > 0
              ? `Found ${allResultsLength} result${
                  allResultsLength === 1 ? "" : "s"
                }:`
              : "No content found matching your search criteria."}
          </p>
        </div>

        {paginatedResults.length ? (
          <div className="space-y-6">
            {paginatedResults.map((item) => (
              <SearchResultItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-8">
              <img
                src="/placeholder.svg"
                alt="No content found"
                className="mx-auto w-64 h-64 opacity-50"
              />
            </div>
            <h2 className="font-display text-2xl font-semibold text-muted-foreground mb-4">
              No Content Found
            </h2>
            <p className="font-serif text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any content matching your search criteria. Try
              adjusting your search terms or browse our collections.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </PageMain>
  );
}

// const Search = () => {
//   const [searchParams] = useSearchParams();
//   const [currentPage, setCurrentPage] = useState(1);
//   const resultsPerPage = 10;
//   const tag = searchParams.get("tag");
//   const date = searchParams.get("date");
//   const collection = searchParams.get("collection");

//   const getSearchResults = () => {
//     if (tag === "nonexistent" || date === "2020-01-01") {
//       return { logbook: [], workbench: [], shoots: [] };
//     }

//     const logbookResults = searchLogbookResults;
//     const workbenchResults = searchWorkbenchResults;
//     const shootsResults = searchShootsResults;

//     // Filter based on search criteria
//     if (collection === "logbook") {
//       return { logbook: logbookResults, workbench: [], shoots: [] };
//     }

//     return {
//       logbook: logbookResults,
//       workbench: workbenchResults,
//       shoots: shootsResults,
//     };
//   };

//   const results = getSearchResults();
//   const allResults = [
//     ...results.logbook.map((item) => ({ ...item, type: "logbook" })),
//     ...results.workbench.map((item) => ({ ...item, type: "workbench" })),
//     ...results.shoots.map((item) => ({ ...item, type: "shoots" })),
//   ];

//   const { paginatedResults, totalPages } = useMemo(() => {
//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;
//     return {
//       paginatedResults: allResults.slice(startIndex, endIndex),
//       totalPages: Math.ceil(allResults.length / resultsPerPage),
//     };
//   }, [allResults, currentPage, resultsPerPage]);

//   const hasResults = allResults.length > 0;

//   const getSearchTitle = () => {
//     if (tag && date)
//       return `Results for "${tag}" on ${new Date(date).toLocaleDateString()}`;
//     if (tag && collection) return `Results for "${tag}" in ${collection}`;
//     if (tag) return `Results for "${tag}"`;
//     if (date) return `Results for ${new Date(date).toLocaleDateString()}`;
//     return "Search Results";
//   };

//   return (
//     <PageContainer>
//       <Header />
//       <SearchPageBody
//         paginatedResults={paginatedResults}
//         allResultsLength={allResults.length}
//         hasResults={hasResults}
//         searchTitle={getSearchTitle()}
//       />
//       {hasResults && (
//         <PaginationWrapper
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       )}
//       <Footer />
//     </PageContainer>
//   );
// };
