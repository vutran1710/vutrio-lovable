"use client";

import { contentGridSections } from "@/lib/mocks";
import { Collection } from "./Collection";

export const ContentGrid = () => {
  const sections = contentGridSections;

  const graphicDiv = (
    <div
      className="absolute pointer-events-none"
      style={{
        backgroundImage: "url(/lightbulb-2.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        top: -80,
        right: 0,
        height: 300,
        width: 300,
      }}
    />
  );

  return (
    <section className="py-10 journal-margins paper-background">
      <div className="max-w-6xl mx-auto relative">
        {/* Section header - journal style */}
        <div className="mb-16 animate-sketch-in">
          <div className="marginalia mb-4">Collections ↓</div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">
            Explore the Archive
          </h2>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl">
            Three distinct collections documenting the journey through code,
            thought, and image.
          </p>
          {graphicDiv}
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {sections.map((section, index) => (
            <Collection key={section.title} item={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
