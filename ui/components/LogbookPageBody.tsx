import {
  LogbookSidebar,
  LogbookMobileStats,
  LogbookPostItem,
  LogbookTags,
  PageMain,
  PageHeader,
} from "@/ui";
import type {
  LogbookPost,
  LogbookStats,
  LogbookTag,
  RecentComment,
} from "@/ui/lib/types";

export interface LogbookProps {
  posts: LogbookPost[];
  stats: LogbookStats;
  tags: LogbookTag[];
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
        title="Philosophical Logbook"
        summary="A collection of thoughts, reflections, and explorations into the depths of human experience and understanding."
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
