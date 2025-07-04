"use client";

import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
} from "phosphor-react";
import type { CollectionPreviewItem } from "./types";

export const logbookStats = {
  totalPosts: 24,
  totalViews: 1247,
  totalComments: 89,
};

export const logbookTags = [
  { name: "philosophy", count: 12 },
  { name: "technology", count: 8 },
  { name: "poetry", count: 6 },
  { name: "life", count: 9 },
  { name: "coding", count: 5 },
  { name: "society", count: 7 },
  { name: "creativity", count: 4 },
  { name: "trust", count: 3 },
];

export const recentComments = [
  {
    author: "Sarah M.",
    content: "Profound insights on digital identity...",
    post: "On the Nature of Digital Identity",
    time: "2h ago",
  },
  {
    author: "Alex K.",
    content: "Your perspective on trust resonates deeply...",
    post: "Contemplations on Trust",
    time: "5h ago",
  },
  {
    author: "Maria L.",
    content: "Beautiful metaphor about walking and thinking...",
    post: "Walking Through Ideas",
    time: "1d ago",
  },
  {
    author: "James R.",
    content: "The poetry in code is so well expressed...",
    post: "The Poetry of Code",
    time: "2d ago",
  },
  {
    author: "Elena S.",
    content: "Thank you for sharing these reflections...",
    post: "On Digital Identity",
    time: "3d ago",
  },
];

export const datesWithPosts = [
  new Date(2024, 0, 15),
  new Date(2024, 0, 12),
  new Date(2024, 0, 10),
  new Date(2024, 0, 8),
];

export const searchLogbookResults = [
  {
    id: 1,
    title: "On the Nature of Digital Identity",
    excerpt:
      "In our interconnected world, the boundaries between our physical and digital selves continue to blur...",
    date: "2024-01-15",
    tags: ["philosophy", "digital-identity", "technology"],
  },
  {
    id: 2,
    title: "The Poetry of Code: Finding Beauty in Logic",
    excerpt:
      "There exists a profound beauty in the elegant solution, where form meets function in perfect harmony...",
    date: "2024-01-12",
    tags: ["coding", "poetry", "creativity"],
  },
];

export const searchWorkbenchResults = [
  {
    id: 1,
    title: "VuGPT Development Progress",
    excerpt:
      "Latest updates on the AI assistant project, focusing on philosophical conversations...",
    date: "2024-01-14",
    tags: ["technology", "ai", "development"],
  },
];

export const searchShootsResults = [
  {
    id: 1,
    title: "Saigon Street Photography",
    excerpt: "Capturing the essence of urban life through candid moments...",
    date: "2024-01-13",
    tags: ["photography", "street", "saigon"],
  },
];

export const contentGridSections: CollectionPreviewItem[] = [
  {
    title: "Thinking",
    description: "Thoughts and reflections from the journey",
    posts: [
      {
        title: "On Digital Identity",
        url: "/logbook/on-the-nature-of-digital-identity",
      },
      {
        title: "The Art of Slow Thinking",
        url: "/logbook/the-art-of-slow-thinking",
      },
    ],
    color: "orange",
    url: "/logbook?tag=philosophy",
  },
  {
    title: "Working",
    description: "Creative works and experiments",
    posts: [
      {
        title: "VuGPT Development",
        url: "/workbench/vugpt-development-progress",
      },
      { title: "AI Content Generator", url: "/workbench/ai-content-generator" },
    ],
    color: "blue",
    url: "/workbench?tag=AI",
  },
  {
    title: "Seeing",
    description: "The person behind the thoughts",
    posts: [
      { title: "Ninh Binh", url: "/shoots/ninh-binh" },
      {
        title: "Saigon Street Photography",
        url: "/shoots/saigon-street-photography",
      },
    ],
    color: "green",
    url: "/shoots?tag=vietnam",
  },
];

export const tagsSectionTags = [
  "writing",
  "philosophy",
  "life",
  "design",
  "code",
  "solana",
  "trust",
  "contemplation",
  "poetry",
  "digital-identity",
  "narratives",
  "wisdom",
];

export const socialSectionPosts = [
  {
    platform: "Instagram",
    title: "Visual Reflections",
    description: "Photo from Saigon, captured last week.",
    type: "instagram",
  },
  {
    platform: "LinkedIn",
    title: "Professional Thoughts",
    description: "My recent post on digital identity and narrative.",
    type: "linkedin",
  },
  {
    platform: "Facebook",
    title: "Memory Lane",
    description: "Throwback to the early days of building VuGPT.",
    type: "facebook",
  },
];

export const footerSocialLinks = [
  { name: "Facebook", icon: FacebookLogo, url: "#" },
  { name: "Instagram", icon: InstagramLogo, url: "#" },
  { name: "LinkedIn", icon: LinkedinLogo, url: "#" },
  { name: "TikTok", icon: TiktokLogo, url: "#" },
  { name: "Threads", icon: InstagramLogo, url: "#" },
];
