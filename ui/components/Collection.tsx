"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CollectionPreviewItem } from "@/lib/types";

interface CollectionProps {
  item: CollectionPreviewItem;
  index?: number;
}

export const Collection = ({ item, index = 0 }: CollectionProps) => {
  const [transform, setTransform] = useState<string>("");

  useEffect(() => {
    const angle = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 2); // ±1–3 deg
    const offsetY = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 10); // ±1–11 px
    const offsetX = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 10); // ±1–11 px

    setTransform(`rotate(${angle}deg) translate(${offsetX}px, ${offsetY}px)`);
  }, []); // run once after mount

  return (
    <div
      className={`collection-bg-${item.color} p-6`}
      style={{
        animationDelay: `${index * 0.2}s`,
        transform,
      }}
    >
      <div className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-widest">
        Collection #{index + 1}
      </div>
      <h3 className="font-display text-2xl font-bold text-foreground mb-4 sketch-underline">
        {item.title}
      </h3>
      <p className="font-serif text-muted-foreground mb-6 leading-relaxed">
        {item.description}
      </p>
      <div className="space-y-3">
        {item.posts.map((post, postIndex) => (
          <Link
            href={post.url}
            key={post.title}
            className="block font-mono text-sm text-foreground hover:text-accent cursor-pointer transition-colors duration-200 border-l-2 border-transparent hover:border-accent pl-4 relative"
          >
            <span className="text-muted-foreground mr-2">
              {String(postIndex + 1).padStart(2, "0")}.
            </span>
            {post.title}
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-dashed border-muted-foreground/30">
        <Link
          className="font-mono text-xs text-accent uppercase tracking-widest"
          href={item.url}
        >
          View All →
        </Link>
      </div>
    </div>
  );
};
