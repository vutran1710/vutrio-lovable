import { notionDatabaseClient, SourceType } from "@/lib/notion-db-client";
import { PageContainer, TopNav, Footer, PaginationWrapper } from "@/ui";
import { SearchPageBody } from "@/ui/components/SearchPageBody";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const validCollections = ["logbook", "workbench", "shoots"];

const POST_PER_PAGE = 6;

export default async function Search({ searchParams }: Props) {
  const { tag, collection, page } = await searchParams;

  const { paginatedResults, allResultLength, searchTitle } =
    await (async () => {
      if (!tag && !collection) {
        return {
          paginatedResults: [],
          allResultLength: 0,
          searchTitle: "No search criteria provided (`tag` or `collection`)",
        };
      }

      if (collection && !validCollections.includes(collection as string)) {
        return {
          paginatedResults: [],
          allResultLength: 0,
          searchTitle: "Invalid collection specified",
        };
      }

      const result = await notionDatabaseClient.paginateBy({
        recordType: collection as SourceType | undefined,
        offset: page ? Number(page) * POST_PER_PAGE : 0,
        limit: POST_PER_PAGE,
        tag: tag as string | undefined,
      });

      if (!result.results.length) {
        return {
          paginatedResults: [],
          allResultLength: 0,
          searchTitle: `No results found for "${tag}" in ${collection || "all collections"}`,
        };
      }

      return {
        paginatedResults: result.results,
        allResultLength: result.total,
        searchTitle: `Results for "${tag}"${collection ? ` in ${collection}` : ""}`,
      };
    })();

  const searchBasePath = `/search?${new URLSearchParams({
    tag: tag as string,
    collection: collection as string,
  }).toString()}`;

  return (
    <PageContainer>
      <TopNav currentPath="/search" />
      <SearchPageBody
        paginatedResults={paginatedResults}
        allResultsLength={allResultLength}
        searchTitle={searchTitle}
      />
      {allResultLength > POST_PER_PAGE && (
        <PaginationWrapper
          currentPage={Number(page)}
          totalPages={allResultLength / POST_PER_PAGE}
          basePath={searchBasePath}
        />
      )}
      <Footer currentPath="/search" />
    </PageContainer>
  );
}
