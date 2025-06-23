"use client";

import { socialSectionPosts } from "@/lib/mocks";

export const SocialSection = () => {
  const socialPosts = socialSectionPosts;

  // Define background colors for social cards
  const cardColors = [
    "bg-accent/10", // dusty red tint
    "bg-vintage-green/10", // faded green tint
    "bg-secondary/50", // paper tone
  ];

  return (
    <section className="py-20 bg-secondary/30 border-t-2 border-b-2 border-foreground border-dashed">
      <div className="max-w-6xl mx-auto px-8">
        {/* Zine-style header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-4">
            Social Fragments
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">
            Digital Marginalia
          </h2>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            Scattered thoughts and quick sketches from across the digital
            landscape
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {socialPosts.map((post, index) => (
            <div
              key={post.platform}
              className={`sketch-card ${cardColors[index % cardColors.length]} p-6 cursor-pointer ${
                index % 2 === 0 ? "zine-rotation" : "zine-rotation-alt"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Platform badge */}
              <div className="vintage-button mb-4 inline-block">
                {post.platform}
              </div>

              <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
                {post.title}
              </h3>

              <p className="font-serif text-muted-foreground leading-relaxed">
                {post.description}
              </p>

              {/* Decorative sketch line */}
              <div className="mt-6 pt-4 border-t border-dashed border-muted-foreground/30">
                <span className="font-mono text-xs text-accent uppercase tracking-widest">
                  Read More ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
