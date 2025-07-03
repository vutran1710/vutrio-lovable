import { notionClient } from "@/lib/notion";
import { incrementPageView } from "@/lib/pageViews";
import { AboutPageBody, Footer, TopNav, PageContainer } from "@/ui";

export default async function About() {
  await incrementPageView("/about");
  const content = await notionClient.getAboutPage();

  const quote = `
    <blockquote className="font-serif text-2xl text-primary text-center italic">
      "The unexamined life is not worth living, but the unlived
      examination is equally barren."
    </blockquote>
    <cite className="block text-center text-muted-foreground mt-4">
      — A personal reflection on Socratic wisdom
    </cite>
    `;

  return (
    <PageContainer>
      <TopNav currentPath="/about" />
      <AboutPageBody
        avatarSrc="/avatar.jpg"
        name="John Doe"
        content={content}
        quote={quote}
      />
      <Footer currentPath="/about" />
    </PageContainer>
  );
}
