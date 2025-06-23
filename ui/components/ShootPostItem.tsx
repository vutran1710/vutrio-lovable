"use client";

import { InstagramLogo, TiktokLogo } from "phosphor-react";
import type { ShootPost } from "../lib/types";

interface ShootPostItemProps {
  post: ShootPost;
  onSelect?: (post: ShootPost) => void;
}

const ShootPostItem = ({ post, onSelect }: ShootPostItemProps) => (
  <div
    className="group cursor-pointer animate-fade-in border border-transparent hover:border-accent transition-colors rounded-lg p-2"
    onClick={() => onSelect?.(post)}
  >
    <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-xl overflow-hidden relative">
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2">
        <a
          href={post.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-accent transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {post.type === "instagram" ? (
            <InstagramLogo size={16} />
          ) : (
            <TiktokLogo size={16} />
          )}
        </a>
      </div>
    </div>
    <div className="mt-4">
      <p className="font-serif text-sm text-foreground mb-2 line-clamp-2">
        {post.caption}
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{post.likes} likes</span>
        <span>{post.date}</span>
      </div>
    </div>
  </div>
);

export default ShootPostItem;
