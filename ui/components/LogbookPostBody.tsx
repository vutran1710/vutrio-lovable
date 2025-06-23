"use client";

import Link from "next/link";
import { PageMain } from "@/ui";
import { ArrowLeft, Calendar, Eye, Heart } from "phosphor-react";
import type { LogbookPost } from "@/ui/lib/types";
import { sampleLogbookPost } from "@/ui/lib/mocks";
import { usePathname } from "next/navigation";

export function LogbookPostBody() {
  const slug = usePathname().split("/").slice(-1)[0] || "";

  const post: LogbookPost = {
    ...sampleLogbookPost,
    slug: slug || sampleLogbookPost.slug,
  };

  return (
    <PageMain>
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/logbook"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Logbook</span>
        </Link>
      </div>

      {/* Post Header */}
      <article className="animate-fade-in">
        <div className="mb-8">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
          />
        </div>

        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span className="text-sm">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye size={16} />
              <span className="text-sm">{post.views} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart size={16} />
              <span className="text-sm">{post.likes} likes</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post Content */}
        <div
          className="prose prose-lg max-w-none font-serif text-foreground prose-headings:font-display prose-headings:text-primary prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>
    </PageMain>
  );
}
