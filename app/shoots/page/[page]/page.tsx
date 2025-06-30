import { cachedFetchPhotosByPage, PHOTO_FOLDER_NAME } from "@/lib/cloudinary";
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

const PHOTO_POSTS_PER_PAGE = 6;
const VIDEO_POSTS_PER_PAGE = 3;
const TOTAL_POSTS_PER_PAGE = PHOTO_POSTS_PER_PAGE + VIDEO_POSTS_PER_PAGE;

export default async function ShootPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 1) return notFound();

  const photos = await cachedFetchPhotosByPage(
    currentPage,
    PHOTO_POSTS_PER_PAGE,
    PHOTO_FOLDER_NAME,
  );

  const videos = TiktokCollections.slice(
    (currentPage - 1) * 3,
    currentPage * 3,
  );

  const contents = [...photos, ...videos];

  if (contents.length === 0) return notFound();

  const hasNext = contents.length === TOTAL_POSTS_PER_PAGE;
  await incrementPageView("/shoots");

  return (
    <PageContainer>
      <TopNav currentPath="/shoots" />
      <ShootsPageBody content={contents} />
      <PaginationWrapper
        currentPage={currentPage}
        basePath="/shoots"
        hasNext={hasNext}
      />
      <Footer currentPath="/shoots" />
    </PageContainer>
  );
}
