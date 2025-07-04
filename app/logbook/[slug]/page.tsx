import { notionClient } from "@/lib/notion";
import { incrementPageView } from "@/lib/pageViews";
import { Footer, TopNav, PageContainer, LogbookPostBody } from "@/ui";
import { notFound } from "next/navigation";
import "react-notion-x/src/styles.css";

export default async function LogbookPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await notionClient.getPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  const relatedPostsPromise = notionClient.getPostsByTags(
    post.tags,
    5,
    post.slug,
  );

  const incrementPromise = incrementPageView(`/logbook/${slug}`);
  const relatedPosts = await relatedPostsPromise;
  void incrementPromise;

  return (
    <PageContainer>
      <TopNav currentPath="/logbook" />
      <LogbookPostBody mainPost={post} relatedPosts={relatedPosts} />
      <Footer currentPath={`/logbook/${slug}`} />
    </PageContainer>
  );
}
