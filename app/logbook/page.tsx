import { PageContainer, Header, Footer } from "@/ui";
import Logbook from "./logbook";

export default function LogbookPage() {
  return (
    <PageContainer>
      <Header currentPath="/logbook" />
      <Logbook />
      <Footer />
    </PageContainer>
  );
}
