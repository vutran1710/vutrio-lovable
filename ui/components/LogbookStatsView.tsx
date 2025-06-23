import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";
import type { LogbookStats as Stats } from "../lib/types";

interface LogbookStatsProps {
  stats: Stats;
}

const LogbookStatsView = ({ stats }: LogbookStatsProps) => (
  <Card className="animate-fade-in shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground">
    <CardHeader>
      <CardTitle className="font-display text-lg">Statistics</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Total Posts</span>
        <span className="font-semibold text-primary">{stats.totalPosts}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Total Views</span>
        <span className="font-semibold text-primary">
          {stats.totalViews.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Comments</span>
        <span className="font-semibold text-primary">
          {stats.totalComments}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default LogbookStatsView;
