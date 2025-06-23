import type { LogbookStats, LogbookTag, RecentComment } from "@/lib/types";
import { LogbookStatsView } from "./LogbookStatsView";
import { LogbookRecentComments } from "./LogbookRecentComments";
import LogbookCalendar from "./LogbookCalendar";
import { LogbookTags } from "./LogbookTags";

interface LogbookSidebarProps {
  stats: LogbookStats;
  tags: LogbookTag[];
  recentComments: RecentComment[];
  datesWithPosts: Date[];
}

export const LogbookSidebar = ({
  stats,
  tags,
  recentComments,
  datesWithPosts,
}: LogbookSidebarProps) => {
  return (
    <div className="w-full min-w-[290px] max-w-[290px] space-y-6">
      <LogbookStatsView stats={stats} />
      <LogbookRecentComments comments={recentComments} />
      <LogbookCalendar datesWithPosts={datesWithPosts} />
      <LogbookTags tags={tags} />
    </div>
  );
};
