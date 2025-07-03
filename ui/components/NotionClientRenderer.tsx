import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  blocks: BlockObjectResponse[];
  className?: string;
}

export function NotionClientRenderer({ blocks, className }: Props) {
  return (
    <div className={`prose-journal ${className || ""}`}>
      {blocks.map((block) => {
        const { id, type } = block;
        const value = (block as any)[type];

        switch (type) {
          case "paragraph":
            return (
              <p
                key={id}
                className="text-justify font-serif"
                style={{ marginBottom: "1rem" }}
              >
                {renderRichText(value.rich_text)}
              </p>
            );
          case "heading_1":
            return (
              <h1
                key={id}
                className="text-4xl font-display font-semibold zine-rotation-alt"
              >
                {renderRichText(value.rich_text)}
              </h1>
            );
          case "heading_2":
            return (
              <h2
                key={id}
                className="text-3xl font-display font-semibold zine-rotation"
              >
                {renderRichText(value.rich_text)}
              </h2>
            );
          case "heading_3":
            return (
              <h3 key={id} className="text-2xl font-display font-medium">
                {renderRichText(value.rich_text)}
              </h3>
            );
          case "bulleted_list_item":
            return (
              <ul key={id} className="list-disc pl-6 font-serif mb-4">
                <li>{renderRichText(value.rich_text)}</li>
              </ul>
            );
          case "numbered_list_item":
            return (
              <ol key={id} className="list-decimal pl-6 font-serif mb-4">
                <li>{renderRichText(value.rich_text)}</li>
              </ol>
            );
          case "quote":
            return (
              <blockquote key={id} className="pull-quote">
                {renderRichText(value.rich_text)}
              </blockquote>
            );
          case "callout":
            return (
              <div
                key={id}
                className="notion-callout my-4 p-4 border-l-4 border-accent bg-secondary rounded-md flex items-start gap-3"
              >
                {value.icon?.emoji && (
                  <div className="text-2xl select-none">{value.icon.emoji}</div>
                )}
                <div className="flex-1">{renderRichText(value.rich_text)}</div>
              </div>
            );
          case "code":
            return (
              <pre
                key={id}
                className="bg-muted p-4 rounded-sm overflow-x-auto font-mono text-sm"
              >
                <code>{value.rich_text[0]?.plain_text}</code>
              </pre>
            );
          case "image":
            const source =
              value.type === "external" ? value.external.url : value.file.url;
            return (
              <figure key={id} className="my-4">
                <img
                  src={source}
                  alt="Notion image"
                  className="rounded-md border border-foreground max-w-full mx-auto"
                />
              </figure>
            );
          default:
            return (
              <p key={id} className="text-sm italic text-muted-foreground">
                ⚠ Unsupported block: <code>{type}</code>
              </p>
            );
        }
      })}
    </div>
  );
}

function renderRichText(richText: any[]) {
  return richText.map((text, i) => {
    const { annotations, plain_text, href } = text;
    if (!plain_text) return null;

    let content = <span key={i}>{plain_text}</span>;

    if (annotations?.bold) content = <strong key={i}>{plain_text}</strong>;
    if (annotations?.italic) content = <em key={i}>{plain_text}</em>;
    if (href)
      content = (
        <a
          key={i}
          href={href}
          className="underline hover:sketch-underline text-accent"
        >
          {plain_text}
        </a>
      );

    return content;
  });
}
