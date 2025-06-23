import { Header, Footer, PageContainer } from "@/ui";
import Shoots from "./shoots";

export default function ShootsPage() {
  return (
    <PageContainer>
      <Header currentPath="/shoots" />
      <Shoots />
      <Footer />
    </PageContainer>
  );
}
