"use client";
import Link from "next/link";
import { Clock, BookOpen, Camera, Wrench } from "phosphor-react";
import { HomeRecentItem } from "@/lib/types";

interface HomeLatestItemProps {
  item: HomeRecentItem;
}

export const HomeLatestItem = ({ item }: HomeLatestItemProps) => {
  const getCollectionIcon = (type: string) => {
    switch (type) {
      case "logbook":
        return <BookOpen size={16} />;
      case "shoots":
        return <Camera size={16} />;
      case "workbench":
        return <Wrench size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <Link
      href={item.itemUrl}
      className="group block sketch-card zine-rotation hover:zine-rotation-alt transition-all duration-300"
    >
      <div className="aspect-[16/9] relative overflow-hidden hidden md:block">
        <img
          src={item.coverUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Sketch-style overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

        {/* Hand-drawn frame effect */}
        <div className="absolute inset-2 border-2 border-background border-dashed pointer-events-none" />

        {/* Content overlay - journal style */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="vintage-button py-1 px-2 text-xs">
              {getCollectionIcon(item.type)}
              <span className="ml-1 capitalize">{item.type}</span>
            </span>
            <span className="font-mono text-background/80 text-sm">
              {getTimeAgo(item.date)}
            </span>
          </div>

          <h3 className="font-display text-4xl font-bold text-background mb-4 sketch-underline">
            {item.title}
          </h3>

          <p className="font-serif text-background text-lg leading-relaxed max-w-2xl">
            {item.description}
          </p>
        </div>
      </div>

      <div className="aspect-[3/4] relative overflow-hidden md:hidden">
        <img
          src={item.coverUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Sketch-style overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

        {/* Content overlay - journal style */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="vintage-button py-1 px-2 text-xs">
              {getCollectionIcon(item.type)}
              <span className="ml-1 capitalize">{item.type}</span>
            </span>
            <span className="font-mono text-background/80 text-sm">
              {getTimeAgo(item.date)}
            </span>
          </div>

          <h3 className="font-display text-4xl font-bold text-background mb-4 sketch-underline">
            {item.title}
          </h3>

          <p className="font-serif text-background text-lg leading-relaxed max-w-2xl">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
