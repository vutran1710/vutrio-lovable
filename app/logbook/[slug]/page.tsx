import { getLogbookEntryBySlug } from "@/lib/notion";
import { Footer, Header, PageContainer, LogbookPostBody } from "@/ui";
import { notFound } from "next/navigation";

export default async function LogbookPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getLogbookEntryBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <LogbookPostBody post={post} />
      <Footer />
    </PageContainer>
  );
}
