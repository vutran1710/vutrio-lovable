import { PageViewCounter } from "./PageViewCounter";
import { FooterSocialGroup } from "./FooterSocialGroup";
import { SpeedInsights } from "@vercel/speed-insights/next";

const OrnamentalDivider = () => (
  <div className="flex items-center justify-center mb-16 px-8 max-w-[100vw]">
    <div className="flex items-center space-x-6 text-muted-foreground max-w-[100vw]">
      <div className="w-20 h-px bg-foreground opacity-30"></div>
      <span className="font-display text-3xl text-accent">※</span>
      <div className="w-12 h-px bg-foreground opacity-30"></div>
      <span className="font-display text-xl text-muted-foreground">◊</span>
      <div className="w-12 h-px bg-foreground opacity-30"></div>
      <span className="font-display text-3xl text-accent">※</span>
      <div className="w-20 h-px bg-foreground opacity-30"></div>
    </div>
  </div>
);

export function Footer({ currentPath }: { currentPath?: string }) {
  return (
    <div className="mt-32">
      {/* Hand-drawn ornamental divider */}
      <OrnamentalDivider />

      <footer className="sketch-card bg-background border-foreground mx-8 mb-8 p-12 zine-rotation footer-card">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Links - vintage buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <FooterSocialGroup />
          </div>

          {/* Copyright - marginalia style */}
          <div className="border-t border-foreground/20 pt-8">
            <p className="font-mono text-sm text-background">
              © 2025 Vũ Trần. All rights reserved.
            </p>
            <p className="font-mono text-xs text-background mt-2">
              Crafted with contemplation & a touch of rebellion
            </p>
          </div>

          {currentPath && (
            <div className="my-4">
              <PageViewCounter slug={currentPath} />
            </div>
          )}
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
}
