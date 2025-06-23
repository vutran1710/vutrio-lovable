"use client";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
} from "phosphor-react";

export const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: FacebookLogo, url: "#" },
    { name: "Instagram", icon: InstagramLogo, url: "#" },
    { name: "LinkedIn", icon: LinkedinLogo, url: "#" },
    { name: "TikTok", icon: TiktokLogo, url: "#" },
    { name: "Threads", icon: InstagramLogo, url: "#" },
  ];

  return (
    <div className="mt-32">
      {/* Hand-drawn ornamental divider */}
      <div className="flex items-center justify-center mb-16 px-8">
        <div className="flex items-center space-x-6 text-muted-foreground">
          <div className="w-20 h-px bg-foreground opacity-30"></div>
          <span className="font-display text-3xl text-accent">※</span>
          <div className="w-12 h-px bg-foreground opacity-30"></div>
          <span className="font-display text-xl text-muted-foreground">◊</span>
          <div className="w-12 h-px bg-foreground opacity-30"></div>
          <span className="font-display text-3xl text-accent">※</span>
          <div className="w-20 h-px bg-foreground opacity-30"></div>
        </div>
      </div>

      <footer className="sketch-card bg-background border-foreground mx-8 mb-8 p-12 zine-rotation footer-card">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote - pull quote style */}
          <div className="font-serif text-lg italic text-background border-l-4 border-accent pl-4 max-w-3xl mx-auto mb-12">
            "In every word written, in every thought shared, we weave the
            tapestry of human understanding."
          </div>

          {/* Social Links - vintage buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            {socialLinks.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  className="vintage-button flex items-center space-x-2"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-mono text-xs hidden sm:inline">
                    {platform.name}
                  </span>
                </a>
              );
            })}
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
        </div>
      </footer>
    </div>
  );
};
