"use client";

import Link from "next/link";
import { ArrowRight } from "phosphor-react";
import type { LogbookPost } from "@/lib/types";

interface LogbookRelatedPostsProps {
  relatedPosts: LogbookPost[];
}

const LogbookRelatedPosts = ({ relatedPosts }: LogbookRelatedPostsProps) => {
  return (
    <div className="animate-fade-in">
      <h3 className="font-display text-lg font-semibold mb-4">Similar posts</h3>
      <div className="space-y-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/logbook/${post.slug}`}
            className="flex items-center justify-between group hover:text-accent transition-colors"
          >
            <span className="text-sm font-medium line-clamp-2 flex-1 pr-2">
              {post.title}
            </span>
            <ArrowRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LogbookRelatedPosts;
