import type { LogbookStats } from "../lib/types";

interface LogbookMobileStatsProps {
  stats: LogbookStats;
}

export const LogbookMobileStats = ({ stats }: LogbookMobileStatsProps) => (
  <div className="bg-card rounded-lg p-4">
    <h3 className="font-display text-lg font-semibold mb-3">Statistics</h3>
    <div className="flex justify-between text-sm">
      <div className="text-center">
        <div className="font-semibold text-primary">{stats.totalPosts}</div>
        <div className="text-muted-foreground">Posts</div>
      </div>
      <div className="text-center">
        <div className="font-semibold text-primary">
          {stats.totalViews.toLocaleString()}
        </div>
        <div className="text-muted-foreground">Views</div>
      </div>
      <div className="text-center">
        <div className="font-semibold text-primary">{stats.totalComments}</div>
        <div className="text-muted-foreground">Comments</div>
      </div>
    </div>
  </div>
);
