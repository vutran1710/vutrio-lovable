import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";
import { ScrollArea } from "../primitives/scroll-area";
import type { RecentComment } from "../lib/types";

interface LogbookRecentCommentsProps {
  comments: RecentComment[];
}

const LogbookRecentComments = ({ comments }: LogbookRecentCommentsProps) => (
  <Card className="animate-fade-in shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground">
    <CardHeader>
      <CardTitle className="font-display text-lg">Recent Comments</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-64">
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="border-b border-border last:border-0 pb-3 last:pb-0"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground">
                  {comment.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1 line-clamp-2">
                "{comment.content}"
              </p>
              <p className="text-xs text-accent">on {comment.post}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

export default LogbookRecentComments;
