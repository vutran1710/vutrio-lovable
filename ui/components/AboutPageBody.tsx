import { PageMain, PageHeader, NotionClientRenderer } from "@/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/primitives";
import { ExtendedRecordMap } from "notion-types";

export interface AboutProps {
  avatarSrc: string;
  name: string;
  content: ExtendedRecordMap;
  quote: string;
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

      <NotionClientRenderer recordMap={content} />

      <div className="mt-12 p-8 bg-secondary rounded-2xl animate-fade-in">
        <div
          className="font-serif text-2xl text-primary text-center italic"
          dangerouslySetInnerHTML={{ __html: quote }}
        />
      </div>
    </PageMain>
  );
}
