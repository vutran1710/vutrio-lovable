"use client";

import { ShootPost } from "@/lib/types";
import { PageMain } from "./PageMain";
import { PageHeader } from "./PageHeader";
import { ShootPostItem } from "./ShootPostItem";
import { useState } from "react";
import { ShootDialog } from "./ShootDialog";

export interface ShootsPageBodyProps {
  content: ShootPost[];
}

export function ShootsPageBody({ content }: ShootsPageBodyProps) {
  const [selectedPost, setSelectedPost] = useState<ShootPost | null>(null);
  const onPostClick = (post: ShootPost) => setSelectedPost(post);

  return (
    <>
      <PageMain>
        <PageHeader
          title="Visual Narratives"
          summary="Moments captured through the lens, where light meets meaning and stories unfold in silence."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.map((item) => (
            <ShootPostItem
              key={`${item.type}-${item.id}`}
              post={item}
              onSelect={onPostClick}
            />
          ))}
        </div>
      </PageMain>
      <ShootDialog post={selectedPost} />
    </>
  );
}
