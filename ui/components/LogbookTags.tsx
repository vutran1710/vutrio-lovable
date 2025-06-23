import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";
import type { LogbookTag } from "@/lib/types";
import Link from "next/link";

interface LogbookTagsProps {
  tags: LogbookTag[];
}

export const LogbookTags = ({ tags }: LogbookTagsProps) => (
  <Card className="animate-fade-in shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground">
    <CardHeader>
      <CardTitle className="font-display text-lg">Tags</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/search?tag=${tag.name}&collection=logbook`}
            className="px-3 py-1 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm cursor-pointer transition-all duration-300 border border-border hover:shadow-md"
          >
            #{tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);
