"use client";

import { InstagramLogo, TiktokLogo } from "phosphor-react";
import type { ShootPost } from "@/lib/types";
import Image from "next/image";

interface ShootPostItemProps {
  post: ShootPost;
  onSelect?: (post: ShootPost) => void;
}

function extractTikTokVideoId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

export const ShootPostItem = ({ post, onSelect }: ShootPostItemProps) => {
  const isTikTok = post.type === "tiktok";
  const videoId = isTikTok ? extractTikTokVideoId(post.sourceUrl!) : null;

  return (
    <div className="group cursor-pointer animate-fade-in border border-transparent hover:border-accent transition-colors rounded-lg p-2">
      <div
        className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-xl overflow-hidden relative"
        onClick={() => onSelect?.(post)}
      >
        <Image
          src={post.cover}
          alt={post.title}
          width={500}
          height={500}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2">
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {post.type === "insta" ? (
              <InstagramLogo size={16} />
            ) : (
              <TiktokLogo size={16} />
            )}
          </a>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-serif text-foreground mb-2 line-clamp-2">
          {post.title}
        </p>
        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 h-16">
            {post.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.likes} likes</span>
          <span>{post.date.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
