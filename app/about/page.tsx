import { Header, Footer, PageMain, PageContainer, PageHeader } from "../../ui";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/primitives";

export interface AboutProps {
  avatarSrc: string;
  name: string;
  content: string;
  quote: string;
}

export function About({ avatarSrc, name, content, quote }: AboutProps) {
  const fallback = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <PageContainer>
      <Header currentPath="/about" />
      <PageMain>
        <PageHeader
          title="About"
          summary="Through code, I create; through words, I explore; through reflection, I grow"
          logo={
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={avatarSrc} alt={name} />
              <AvatarFallback className="text-3xl font-semibold">
                {fallback}
              </AvatarFallback>
            </Avatar>
          }
        />

        <div className="prose prose-lg max-w-none animate-fade-in">
          <div className="font-serif text-xl text-muted-foreground leading-relaxed mb-8">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className="mt-12 p-8 bg-secondary rounded-2xl animate-fade-in">
          <div
            className="font-serif text-2xl text-primary text-center italic"
            dangerouslySetInnerHTML={{ __html: quote }}
          />
        </div>
      </PageMain>
      <Footer />
    </PageContainer>
  );
}

export default function AboutWrapper() {
  const content = `
    <p className="mb-6">
      Welcome to my digital sanctuary—a space where philosophy meets
      technology, where poetic reflections interweave with analytical
      thinking, and where the journey of understanding takes precedence
      over the destination of knowing.
    </p>
    <p className="mb-6">
      I am a seeker of truth in the age of information, a builder of
      bridges between the abstract and the concrete, the theoretical and
      the practical. .
    </p>

    <p className="mb-6">
      This space serves as both archive and laboratory—a place to
      document insights, experiment with ideas, and share the ongoing
      dialogue between mind and world that shapes our understanding of
      what it means to be human in an increasingly digital age.
    </p>

    <p>
      Join me in this exploration, where every question leads to deeper
      questions, and every answer opens new doorways to wonder.
    </p>
    `;

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
    <About
      avatarSrc="/placeholder.svg"
      name="Vũ Trần"
      content={content}
      quote={quote}
    />
  );
}
