"use client";

import { BookOpen, Camera, Wrench } from "phosphor-react";
import { BaseRecord, LogbookPost, ShootPost, WorkbenchPost } from "@/lib/types";
import { HomeLatestItem, RecentUpdate } from "@/ui";
import { useState } from "react";

type HeroProps = {
  logbookPosts: LogbookPost[];
  shootPosts: ShootPost[];
  workbenchPost: WorkbenchPost[];
};

export const Hero = (props: HeroProps) => {
  const mostRecent = [
    props.logbookPosts
      ? { ...props.logbookPosts[0], type: "logbook" }
      : undefined,
    props.shootPosts ? { ...props.shootPosts[0], type: "shoots" } : undefined,
    props.workbenchPost
      ? { ...props.workbenchPost[0], type: "workbench" }
      : undefined,
  ]
    .filter((i) => !!i)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })[0] as unknown as BaseRecord & {
    type: "logbook" | "shoots" | "workbench";
  };

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

  const [activeHomeRecentItem, setActiveHomeRecentItem] = useState(mostRecent);

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

          <h1 className="font-display text-5xl font-bold text-foreground mb-4 drop-cap hidden md:block">
            Recent Explorations & Reflections
          </h1>

          <h1 className="font-display text-4xl font-bold text-foreground mb-4 md:hidden drop-cap-sm">
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
            <HomeLatestItem item={activeHomeRecentItem} />
          </div>

          {/* Recent Content List - Marginalia style */}
          <div className="lg:col-span-1">
            <div className="marginalia mb-6">Recent updates</div>

            <div className="space-y-8">
              <RecentUpdate
                icon={<BookOpen size={16} className="text-accent" />}
                title="Logbook"
                items={props.logbookPosts}
                onHover={(item) =>
                  setActiveHomeRecentItem({ ...item, type: "logbook" })
                }
              />

              <RecentUpdate
                icon={<Camera size={16} className="text-accent" />}
                title="Shoots"
                items={props.shootPosts}
                onHover={(item) =>
                  setActiveHomeRecentItem({ ...item, type: "shoots" })
                }
              />

              <RecentUpdate
                icon={<Wrench size={16} className="text-accent" />}
                title="Workbench"
                items={props.workbenchPost}
                onHover={(item) =>
                  setActiveHomeRecentItem({ ...item, type: "workbench" })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
