import { getLogbookEntriesByTags, getLogbookEntryBySlug } from "@/lib/notion";
import { Footer, Header, PageContainer, LogbookPostBody } from "@/ui";
import { notFound } from "next/navigation";
import "react-notion-x/src/styles.css";

export default async function LogbookPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getLogbookEntryBySlug(slug);
  const relatedPosts = await getLogbookEntriesByTags(
    post?.tags || [],
    5,
    post?.slug,
  );

  if (!post) {
    return notFound();
  }

  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <LogbookPostBody mainPost={post} relatedPosts={relatedPosts} />
      <Footer />
    </PageContainer>
  );
}
