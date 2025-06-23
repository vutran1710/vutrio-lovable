import {
  Header,
  PageContainer,
  Hero,
  ContentGrid,
  TagsSection,
  SocialSection,
  Footer,
} from "../../ui";

const Index = () => {
  const location = "/"; // Simulating location for demonstration
  return (
    <PageContainer>
      <Header currentPath={location} />
      <main>
        <Hero />
        <ContentGrid />
        <TagsSection />
        <SocialSection />
      </main>
      <Footer />
    </PageContainer>
  );
};

export default Index;
