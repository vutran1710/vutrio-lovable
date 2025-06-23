import { Link } from "../primitives";
import type { LogbookPost } from "../lib/types";

interface LogbookPostItemProps {
  post: LogbookPost;
}

export const LogbookPostItem = ({ post }: LogbookPostItemProps) => (
  <Link key={post.id} to={`/logbook/${post.slug}`} className="block">
    <article className="animate-fade-in cursor-pointer border border-transparent hover:border-accent transition-colors rounded-lg p-2">
      <div className="md:flex">
        <div className="md:w-48 h-48 md:h-auto">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-3">
            <time className="text-sm text-muted-foreground font-medium">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h2 className="font-display text-2xl font-semibold text-primary mb-3 hover:text-accent transition-colors">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="font-serif text-muted-foreground leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  </Link>
);
