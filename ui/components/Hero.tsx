"use client";

import { BookOpen, Camera, Wrench } from "phosphor-react";
import { shootsContent } from "@/lib/mocks";
import {
  HomeRecentItem,
  LogbookPost,
  ShootPost,
  WorkbenchPost,
} from "@/lib/types";
import HomeLatestItem from "./HomeLatestItem";
import RecentUpdate from "./RecentUpdate";

type HeroProps = {
  logbookPosts: LogbookPost[];
  shootPosts: ShootPost[];
  workbenchPost: WorkbenchPost[];
};

export const Hero = (props: HeroProps) => {
  const sortedByTime = [
    ...props.logbookPosts.map((post) => ({ ...post, type: "logbook" })),
    ...props.shootPosts.map((post) => ({ ...post, type: "shoots" })),
    ...props.workbenchPost.map((project) => ({
      ...project,
      type: "workbench",
    })),
  ].sort((a, b) => {
    // sort by time, get the latest
    return b.date.getTime() - a.date.getTime();
  });
  const mostRecent = sortedByTime[0];

  if (!mostRecent) {
    return (
      <section className="pt-32 pb-20 journal-margins paper-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-5xl font-bold text-foreground mb-6">
            No recent content available
          </h1>
          <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Check back later for updates.
          </p>
        </div>
      </section>
    );
  }

  // Convert to HomeRecentItem format
  /* eslint-disable */
  const getHomeRecentItem = (item: any): HomeRecentItem => {
    if (item.type === "logbook") {
      return {
        type: item.type,
        title: item.title,
        description: item.excerpt || "",
        coverUrl: item.cover,
        date: item.date,
        itemUrl: `/logbook/${item.slug}`,
      };
    }
    if (item.type === "shoots") {
      return {
        type: item.type,
        title: item.caption,
        description: item.description || item.caption,
        coverUrl: item.imageUrl,
        date: item.date,
        itemUrl: `/shoots/${item.id}`,
      };
    }
    if (item.type === "workbench") {
      return {
        type: item.type,
        title: item.title,
        description: item.description,
        coverUrl: item.coverImage,
        date: item.date,
        itemUrl: `/workbench/${item.id}`,
      };
    }
    return {
      type: item.type,
      title: "Untitled",
      description: "",
      coverUrl: "/placeholder.svg",
      date: item.date,
      itemUrl: "#",
    };
  };

  const latestItem = getHomeRecentItem(mostRecent);

  // Get recent posts for sidebar (2 from each collection)
  const recentLogbook = props.logbookPosts.map((post) =>
    getHomeRecentItem({
      ...post,
      type: "logbook",
    }),
  );

  const recentShoots = props.shootPosts.map((post) =>
    getHomeRecentItem({
      ...post,
      type: "shoots",
    }),
  );

  const recentWorkbench = props.workbenchPost.map((project) =>
    getHomeRecentItem({
      ...project,
      type: "workbench",
    }),
  );

  return (
    <section className="pt-32 pb-20 journal-margins paper-background">
      <div className="max-w-6xl mx-auto">
        {/* Journal entry header */}
        <div className="mb-12 animate-sketch-in">
          <div className="flex items-center mb-4">
            <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
              Field Notes
            </span>
            <div className="flex-1 h-px bg-foreground ml-4 opacity-30"></div>
            <span className="font-mono text-xs text-muted-foreground ml-4">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-display text-5xl font-bold text-foreground mb-6 drop-cap">
            Recent Explorations & Reflections
          </h1>

          <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A curated collection of thoughts, projects, and visual narratives
            from the intersection of code, philosophy, and creative expression.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Latest Content Preview - Journal style */}
          <div className="lg:col-span-3">
            <div className="marginalia mb-4">Latest creation ↓</div>
            <HomeLatestItem item={latestItem} />
          </div>

          {/* Recent Content List - Marginalia style */}
          <div className="lg:col-span-1">
            <div className="marginalia mb-6">Recent updates</div>

            <div className="space-y-8">
              <RecentUpdate
                icon={<BookOpen size={16} className="text-accent" />}
                title="Logbook"
                items={recentLogbook}
              />

              <RecentUpdate
                icon={<Camera size={16} className="text-accent" />}
                title="Shoots"
                items={recentShoots}
              />

              <RecentUpdate
                icon={<Wrench size={16} className="text-accent" />}
                title="Workbench"
                items={recentWorkbench}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
