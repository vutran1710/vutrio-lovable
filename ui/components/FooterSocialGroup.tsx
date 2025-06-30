"use client";

import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
} from "phosphor-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: FacebookLogo,
    url: "https://www.facebook.com/vutran1087",
  },
  {
    name: "Instagram",
    icon: InstagramLogo,
    url: "https://www.instagram.com/vutran1087",
  },
  {
    name: "LinkedIn",
    icon: LinkedinLogo,
    url: "https://www.linkedin.com/in/vutr",
  },
  {
    name: "TikTok",
    icon: TiktokLogo,
    url: "https://www.tiktok.com/@vutr_engineer",
  },
];

export function FooterSocialGroup() {
  return (
    <>
      {socialLinks.map((platform) => {
        const Icon = platform.icon;
        return (
          <a
            key={platform.name}
            href={platform.url}
            className="vintage-button flex items-center space-x-2"
          >
            <Icon className="w-5 h-5 min-w-[20px] min-h-[20px]" />
            <span className="font-mono text-xs hidden xs:hidden sm:hidden md:block lg:block xl:block">
              {platform.name}
            </span>
          </a>
        );
      })}
    </>
  );
}
