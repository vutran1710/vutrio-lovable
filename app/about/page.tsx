import { notionClient } from "@/lib/notion";
import { AboutPageBody } from "@/ui";

export default async function AboutWrapper() {
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
    <AboutPageBody
      avatarSrc="/placeholder.svg"
      name="Vũ Trần"
      content={content}
      quote={quote}
    />
  );
}
