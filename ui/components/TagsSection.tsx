import Link from "next/link";

type TagsSectionProps = {
  tags: string[];
};

export const TagsSection = ({ tags }: TagsSectionProps) => {
  return (
    <section className="py-16 px-6 paper-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-semibold mb-8 text-primary">
          Thematic Threads
        </h2>
        <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
          Ideas and concepts woven through the collection, connecting thoughts
          across time and space.
        </p>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?tag=${tag}`}
              className="px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium cursor-pointer transition-all duration-300 border border-border hover:shadow-md"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
