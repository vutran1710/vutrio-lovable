"use client";

import Link from "next/link";
import { NotionClientRenderer, PageMain } from "@/ui";
import { ArrowLeft, Calendar, Eye, Heart } from "phosphor-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/primitives";
import type { LogbookPost } from "@/lib/types";
import { ExtendedRecordMap } from "notion-types";
import LogbookRelatedPosts from "./LogbookRelatedPost";

type LogbookPostBodyProps = {
  mainPost: LogbookPost;
  relatedPosts: LogbookPost[];
};

export function LogbookPostBody(props: LogbookPostBodyProps) {
  const { mainPost: post, relatedPosts } = props;
  console.log(">>>>>>>>", post);
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

        {/* Mobile Related Posts Accordion - Only visible on mobile */}
        <div className="md:hidden mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="related-posts">
              <AccordionTrigger>Similar posts</AccordionTrigger>
              <AccordionContent>
                <LogbookRelatedPosts relatedPosts={relatedPosts} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Post Content */}
        <div className="flex gap-8">
          {/* Sidebar - 25% width */}
          <aside className="hidden md:block w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <LogbookRelatedPosts
                showTitle={true}
                relatedPosts={relatedPosts}
              />
            </div>
          </aside>

          {/* Main content - 75% width */}
          <div className="flex-1">
            <article className="animate-fade-in max-w-full">
              <NotionClientRenderer
                recordMap={post.content! as ExtendedRecordMap}
              />
            </article>
          </div>
        </div>
      </article>
    </PageMain>
  );
}
