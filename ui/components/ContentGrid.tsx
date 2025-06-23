"use client";

import { contentGridSections } from "@/lib/mocks";
import { Collection } from "./Collection";

export const ContentGrid = () => {
  const sections = contentGridSections;

  return (
    <section className="py-20 journal-margins paper-background">
      <div className="max-w-6xl mx-auto">
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
