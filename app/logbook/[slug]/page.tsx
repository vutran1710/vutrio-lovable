import { Footer, Header, PageContainer, LogbookPostBody } from "@/ui";

export default function LogbookPostPage() {
  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <LogbookPostBody />
      <Footer />
    </PageContainer>
  );
}
