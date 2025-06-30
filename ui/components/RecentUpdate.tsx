import Link from "next/link";
import { ReactNode } from "react";
import { HomeRecentItem } from "@/lib/types";

interface RecentUpdateProps {
  icon: ReactNode;
  title: string;
  items: HomeRecentItem[];
  onHover?: (item: HomeRecentItem) => void;
}

export const RecentUpdate = ({
  icon,
  title,
  items,
  onHover,
}: RecentUpdateProps) => {
  return (
    <div className="animate-sketch-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-accent">{icon}</div>
        <h3 className="font-mono text-sm font-medium text-foreground uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex-1 h-px bg-foreground/20"></div>
      </div>

      <div className="space-y-1">
        {items.map((item, index) => (
          <Link
            key={`${item.type}-${index}`}
            href={item.itemUrl}
            className="block text-sm text-muted-foreground hover:text-accent transition-colors py-2 border-l-2 border-transparent hover:border-accent pl-4 font-serif leading-relaxed group"
            onMouseEnter={() => onHover?.(item)}
          >
            <span className="font-mono text-xs text-muted-foreground mr-2 group-hover:text-accent">
              {String(index + 1).padStart(2, "0")}.
            </span>
            {item.title.length > 35
              ? `${item.title.substring(0, 35)}...`
              : item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
