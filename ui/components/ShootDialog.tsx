"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../primitives/dialog";
import { InstagramLogo, TiktokLogo, Heart, Calendar } from "phosphor-react";
import type { ShootPost } from "@/lib/types";

interface ShootDialogProps {
  post: ShootPost | null;
  onOpenChange?: (open: boolean) => void;
}

function getTikTokEmbedUrl(originalUrl: string): string | null {
  const match = originalUrl.match(/\/video\/(\d+)/);
  return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
}

export const ShootDialog = ({ post, onOpenChange }: ShootDialogProps) => {
  const src =
    post?.type === "tiktok"
      ? getTikTokEmbedUrl(post.sourceUrl!)!
      : post?.image!;
  return (
    <Dialog open={!!post} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(550px,90vw)] max-h-[90vh] overflow-hidden flex flex-col">
        {post && (
          <>
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center gap-2">
                {post.type === "insta" ? (
                  <InstagramLogo size={20} />
                ) : (
                  <TiktokLogo size={20} />
                )}
                Visual Story
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 flex flex-col min-h-0 gap-4">
              <div className="flex-1 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                {post.type === "tiktok" ? (
                  // 9:16 aspect ratio for TikTok (portrait)
                  <div className="relative w-full pt-[117.78%]">
                    {" "}
                    <iframe
                      src={src}
                      title="TikTok"
                      allow="encrypted-media"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-none rounded-md"
                    />
                  </div>
                ) : (
                  // 1:1 aspect ratio for images
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={src}
                      alt={post.description}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3 flex-shrink-0">
                <p className="font-serif text-foreground">{post.title}</p>

                {post.description && (
                  <p className="text-muted-foreground text-sm my-2">
                    {post.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart size={16} />
                      <span>{post.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors underline"
                  >
                    View on {post.type === "insta" ? "Instagram" : "TikTok"}
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
