"use client";

import { ShootPost } from "@/lib/types";
import { PageMain } from "./PageMain";
import { PageHeader } from "./PageHeader";
import { ShootPostItem } from "./ShootPostItem";
import { useState } from "react";
import { ShootDialog } from "./ShootDialog";
import Image from "next/image";

export interface ShootsPageBodyProps {
  content: ShootPost[];
}

export function ShootsPageBody({ content }: ShootsPageBodyProps) {
  const [selectedPost, setSelectedPost] = useState<ShootPost | null>(null);

  return (
    <>
      <PageMain>
        <PageHeader
          title="Visual Narratives"
          summary="A mixtape of pixels: part wandering, part wondering, part wailing guitar solo on life’s weird stage"
          logo={
            <Image
              src="/shoots-foto.png"
              alt="Shoots Logo"
              className="md:w-32 md:h-32"
              loading="lazy"
              width={600}
              height={600}
            />
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.map((item) => (
            <ShootPostItem
              key={`${item.type}-${item.id}`}
              post={item}
              onSelect={setSelectedPost}
            />
          ))}
        </div>
      </PageMain>
      <ShootDialog
        post={selectedPost}
        onOpenChange={() => setSelectedPost(null)}
      />
    </>
  );
}
