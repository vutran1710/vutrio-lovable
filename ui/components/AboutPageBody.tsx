import { PageMain, NotionClientRenderer } from "@/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/primitives";
import { BlockObjectResponse } from "@notionhq/client";

export interface AboutProps {
  avatarSrc: string;
  name: string;
  content: BlockObjectResponse[];
  quote?: string;
}

export function AboutPageBody({ avatarSrc, name, content, quote }: AboutProps) {
  const fallback = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <PageMain>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-6">
        {/* Left Column - Title, Photo, Subtitle */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="lg:sticky lg:top-24 text-center">
            <h1 className="font-display text-4xl font-bold text-primary mb-6">
              About
            </h1>

            <div className="flex justify-center mb-6">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={avatarSrc} alt={name} />
                <AvatarFallback className="text-3xl font-semibold">
                  {fallback}
                </AvatarFallback>
              </Avatar>
            </div>

            <p className="font-serif text-lg text-muted-foreground italic text-center lg:text-center">
              Unordered moments of either "Ah-ha!", "Seriously??" or "WTF?!"
            </p>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:w-3/4">
          <NotionClientRenderer blocks={content} className="max-w-full" />

          {quote && (
            <div className="mt-12 p-8 bg-secondary rounded-2xl animate-fade-in">
              <div
                className="font-serif text-2xl text-primary text-center italic"
                dangerouslySetInnerHTML={{ __html: quote }}
              />
            </div>
          )}
        </div>
      </div>
    </PageMain>
  );
}
