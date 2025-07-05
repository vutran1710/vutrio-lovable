import {
  LogbookSidebar,
  LogbookMobileStats,
  LogbookPostItem,
  LogbookTags,
  PageMain,
  PageHeader,
} from "@/ui";
import type { LogbookPost, LogbookStats, RecentComment } from "@/lib/types";
import Image from "next/image";

export interface LogbookProps {
  posts: LogbookPost[];
  stats: LogbookStats;
  tags: Map<string, number>;
  recentComments: RecentComment[];
  datesWithPosts: Date[];
}

export function LogbookPageBody({
  posts,
  stats,
  tags,
  recentComments,
  datesWithPosts,
}: LogbookProps) {
  return (
    <PageMain>
      <PageHeader
        title="Logbook"
        summary="Mental spaghetti on digital paper, tangled thoughts sauced in curiosity, served cold with occasional existential meatballs"
        logo={
          <Image
            src="/logbook-foto.png"
            alt="Shoots Logo"
            className="md:w-32 md:h-32"
            loading="lazy"
            width={600}
            height={600}
          />
        }
      />

      {/* Mobile Stats and Tags - Only visible on mobile */}
      <div className="md:hidden mb-8 space-y-6">
        <LogbookMobileStats stats={stats} />
        <LogbookTags tags={tags} />
      </div>

      <div className="flex gap-8">
        {/* Main Content - Full width on mobile, remaining space on desktop */}
        <div className="flex-1 min-w-0">
          <div className="space-y-12">
            {posts.map((post) => (
              <LogbookPostItem key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar - Hidden on mobile, fixed width on desktop */}
        <div className="hidden md:block flex-shrink-0">
          <LogbookSidebar
            stats={stats}
            tags={tags}
            recentComments={recentComments}
            datesWithPosts={datesWithPosts}
          />
        </div>
      </div>
    </PageMain>
  );
}
