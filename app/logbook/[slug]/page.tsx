import { notionClient } from "@/lib/notion";
import { incrementPageView } from "@/lib/pageViews";
import { Footer, Header, PageContainer, LogbookPostBody } from "@/ui";
import { notFound } from "next/navigation";
import "react-notion-x/src/styles.css";

export default async function LogbookPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await notionClient.getPostBySlug(slug);
  const relatedPosts = await notionClient.getPostsByTags(
    post?.tags || [],
    5,
    post?.slug,
  );

  if (!post) {
    return notFound();
  }

  await incrementPageView(`/logbook/${slug}`);

  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <LogbookPostBody mainPost={post} relatedPosts={relatedPosts} />
      <Footer currentPath={`/logbook/${slug}`} />
    </PageContainer>
  );
}
