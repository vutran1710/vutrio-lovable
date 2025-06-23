import {
  Header,
  PageContainer,
  Hero,
  ContentGrid,
  TagsSection,
  SocialSection,
  Footer,
} from "../ui";

export default function Home() {
  return (
    <PageContainer>
      <Header currentPath="/" />
      <main>
        <Hero />
        <ContentGrid />
        <TagsSection />
        <SocialSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
