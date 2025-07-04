import { notionDatabaseClient } from "@/lib/notion-db-client";
import { incrementPageView } from "@/lib/pageViews";
import { LogbookPost } from "@/lib/types";
import { Footer, TopNav, PageContainer, LogbookPostBody } from "@/ui";
import { notFound } from "next/navigation";
import "react-notion-x/src/styles.css";

export default async function LogbookPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await notionDatabaseClient.findPostBySlug(slug, "logbook")) as
    | LogbookPost
    | undefined;
  if (!post) {
    return notFound();
  }

  if (!post.content) {
    post.content = await notionDatabaseClient.getPageBlocks(post.id);
  }

  const relatedPostsPromise = notionDatabaseClient
    .findPostsByTags(post.tags, "logbook")
    .then((result) => {
      // Filter out the current post from related posts
      return result.logbook.filter((p) => p.slug !== slug);
    });

  const viewCount = await incrementPageView(`/logbook/${slug}`);
  const relatedPosts = await relatedPostsPromise;

  return (
    <PageContainer>
      <TopNav currentPath="/logbook" />
      <LogbookPostBody
        mainPost={post}
        relatedPosts={relatedPosts}
        views={viewCount}
      />
      <Footer currentPath={`/logbook/${slug}`} />
    </PageContainer>
  );
}
