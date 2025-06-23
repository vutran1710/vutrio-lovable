import Link from "next/link";

interface ResultItem {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

interface SearchResultItemProps {
  item: ResultItem;
  type: string;
}

export const SearchResultItem = ({ item, type }: SearchResultItemProps) => (
  <Link
    href={`/${type}/${item.id}`}
    className="block bg-card rounded-lg p-6 cursor-pointer border border-border hover:border-accent transition-colors"
  >
    <div className="flex items-center justify-between mb-3">
      <time className="text-sm text-muted-foreground font-medium">
        {new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <span className="text-xs text-accent uppercase tracking-wide font-medium">
        {type}
      </span>
    </div>
    <h3 className="font-display text-xl font-semibold text-primary mb-3 hover:text-accent transition-colors">
      {item.title}
    </h3>
    <p className="font-serif text-muted-foreground leading-relaxed mb-4">
      {item.excerpt}
    </p>
    <div className="flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
        >
          #{tag}
        </span>
      ))}
    </div>
  </Link>
);
