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

export const ShootDialog = ({ post, onOpenChange }: ShootDialogProps) => (
  <Dialog open={!!post} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-[min(1000px,80vw)] max-h-[80vh] overflow-hidden flex flex-col">
      {post && (
        <>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              {post.type === "instagram" ? (
                <InstagramLogo size={20} />
              ) : (
                <TiktokLogo size={20} />
              )}
              Visual Story
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-gradient-to-br from-secondary to-muted rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="space-y-3 mt-4 flex-shrink-0">
              <p className="font-serif text-foreground">{post.caption}</p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                </div>

                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors underline"
                >
                  View on {post.type === "instagram" ? "Instagram" : "TikTok"}
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);
