"use client";

import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
} from "phosphor-react";
import type {
  LogbookPost,
  WorkbenchPost,
  ShootPost,
  CollectionPreviewItem,
} from "./types";

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

export const workbenchProjects: WorkbenchPost[] = [
  {
    id: 1,
    title: "Portfolio Analytics Dashboard",
    description:
      "A comprehensive analytics dashboard built with React and D3.js for visualizing portfolio performance metrics.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/portfolio-analytics",
    techStack: ["React", "TypeScript", "D3.js", "Node.js"],
    tags: ["Analytics", "Dashboard", "Data Visualization"],
    stars: 42,
  },
  {
    id: 2,
    title: "AI Content Generator",
    description:
      "An intelligent content generation tool leveraging OpenAI API for creating blog posts and marketing copy.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/ai-content-gen",
    techStack: ["Next.js", "Python", "OpenAI API", "PostgreSQL"],
    tags: ["AI", "Content", "Automation"],
    stars: 128,
  },
  {
    id: 3,
    title: "Minimalist Note Taking",
    description:
      "A clean, distraction-free note-taking application with markdown support and local storage.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/minimal-notes",
    techStack: ["Vue.js", "JavaScript", "Markdown"],
    tags: ["Productivity", "Notes", "Minimalist"],
    stars: 87,
  },
  {
    id: 4,
    title: "Weather Forecast API",
    description:
      "RESTful API service providing detailed weather forecasts with machine learning predictions.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/weather-api",
    techStack: ["Python", "FastAPI", "ML", "Docker"],
    tags: ["API", "Weather", "Machine Learning"],
    stars: 203,
  },
  {
    id: 5,
    title: "Real-Time Chat Mesh",
    description:
      "A peer-to-peer real-time chat application using WebRTC and a lightweight mesh overlay network.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/real-time-chat-mesh",
    techStack: ["React", "WebRTC", "Socket.IO", "TypeScript"],
    tags: ["Real-Time", "Chat", "P2P"],
    stars: 96,
  },
  {
    id: 6,
    title: "Markdown Journal Compiler",
    description:
      "CLI tool that compiles a directory of markdown entries into a beautifully styled PDF journal.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/md-journal-compiler",
    techStack: ["Node.js", "Marked", "Puppeteer"],
    tags: ["CLI", "Markdown", "PDF"],
    stars: 54,
  },
  {
    id: 7,
    title: "Blockchain Voting Demo",
    description:
      "A transparent voting system built on Ethereum smart contracts with a React admin interface.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/blockchain-voting",
    techStack: ["Solidity", "React", "Hardhat", "Ethers.js"],
    tags: ["Blockchain", "Voting", "Demo"],
    stars: 78,
  },
  {
    id: 8,
    title: "SVG Animation Playground",
    description:
      "An interactive playground for animating SVGs using GSAP and real-time code preview.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/svg-animation-playground",
    techStack: ["Vanilla JS", "GSAP", "HTML/CSS"],
    tags: ["Animation", "SVG", "Playground"],
    stars: 34,
  },
  {
    id: 9,
    title: "Personal Finance Tracker",
    description:
      "Track expenses and visualize financial habits over time with dynamic charts and monthly summaries.",
    coverImage: "/placeholder.svg",
    githubUrl: "https://github.com/example/finance-tracker",
    techStack: ["Svelte", "Chart.js", "IndexedDB"],
    tags: ["Finance", "Tracker", "Visualization"],
    stars: 112,
  },
];

export const shootsContent: ShootPost[] = [
  {
    id: 1,
    imageUrl: "/placeholder.svg",
    caption: "Golden hour reflections in the city",
    likes: 124,
    date: new Date("2024-01-15"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example1",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg",
    caption: "Morning coffee and contemplation",
    likes: 89,
    date: new Date("2024-01-12"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example2",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg",
    caption: "Street art tells stories",
    likes: 156,
    date: new Date("2024-01-10"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example3",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg",
    caption: "Nature's geometry",
    likes: 203,
    date: new Date("2024-01-08"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example4",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg",
    caption: "Urban solitude",
    likes: 178,
    date: new Date("2024-01-05"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example5",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg",
    caption: "Light and shadow dance",
    likes: 245,
    date: new Date("2024-01-03"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example6",
  },
  {
    id: 7,
    imageUrl: "/placeholder.svg",
    caption: "Muted echoes of a rainy day",
    likes: 132,
    date: new Date("2024-01-02"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example7",
  },
  {
    id: 8,
    imageUrl: "/placeholder.svg",
    caption: "Footsteps in forgotten alleys",
    likes: 97,
    date: new Date("2024-01-01"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example8",
  },
  {
    id: 9,
    imageUrl: "/placeholder.svg",
    caption: "Stillness at the edge of dusk",
    likes: 176,
    date: new Date("2023-12-29"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example9",
  },
  {
    id: 10,
    imageUrl: "/placeholder.svg",
    caption: "Concrete dreams and neon breath",
    likes: 201,
    date: new Date("2023-12-26"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example10",
  },
  {
    id: 11,
    imageUrl: "/placeholder.svg",
    caption: "Silhouettes fading into fog",
    likes: 118,
    date: new Date("2023-12-24"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example11",
  },
  {
    id: 12,
    imageUrl: "/placeholder.svg",
    caption: "Through a cracked window",
    likes: 143,
    date: new Date("2023-12-22"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example12",
  },
  {
    id: 13,
    imageUrl: "/placeholder.svg",
    caption: "Traces of laughter in old stairwells",
    likes: 109,
    date: new Date("2023-12-20"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example13",
  },
  {
    id: 14,
    imageUrl: "/placeholder.svg",
    caption: "Beneath flickering streetlamps",
    likes: 165,
    date: new Date("2023-12-18"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example14",
  },
  {
    id: 15,
    imageUrl: "/placeholder.svg",
    caption: "Worn paths and whispered memories",
    likes: 154,
    date: new Date("2023-12-16"),
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example15",
  },
  {
    id: 16,
    imageUrl: "/placeholder.svg",
    caption: "Still frames from fleeting hours",
    likes: 189,
    date: new Date("2023-12-14"),
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example16",
  },
];

export const sampleLogbookPost: LogbookPost = {
  id: "1",
  slug: "on-the-nature-of-digital-identity",
  title: "On the Nature of Digital Identity",
  date: new Date("2024-01-15"),
  cover: "/placeholder.svg",
  content: `
      <p>In our interconnected world, the boundaries between our physical and digital selves continue to blur, creating a fascinating duality that challenges our traditional understanding of identity.</p>

      <h2>The Digital Self</h2>
      <p>Our digital identity encompasses more than just our social media profiles or online presence. It represents a complex amalgamation of our thoughts, interactions, and digital footprints that collectively form a new dimension of human existence.</p>

      <blockquote>"We are not just users of technology; we are co-creators of a digital reality that shapes and is shaped by our deepest human experiences."</blockquote>

      <h2>Philosophy in the Digital Age</h2>
      <p>As we navigate this digital landscape, we must ask ourselves: What does it mean to be authentic in a world where our identities can be curated, edited, and presented through carefully chosen pixels and words?</p>

      <p>The answer lies not in rejecting our digital selves, but in understanding how they complement and extend our physical being, creating a more complete picture of who we are in the 21st century.</p>
    `,
  tags: ["philosophy", "digital-identity", "technology"],
  views: 1243,
  likes: 89,
  comments: 23,
};

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
    color: "from-sandy-orange/30 to-sandy-orange/10",
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
    color: "from-vintage-blue/20 to-vintage-blue/10",
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
    color: "from-dusty-green/20 to-dusty-green/10",
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
    gradient: "from-pink-500/10 to-purple-500/10",
  },
  {
    platform: "LinkedIn",
    title: "Professional Thoughts",
    description: "My recent post on digital identity and narrative.",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    platform: "Facebook",
    title: "Memory Lane",
    description: "Throwback to the early days of building VuGPT.",
    gradient: "from-blue-600/10 to-blue-400/10",
  },
];

export const footerSocialLinks = [
  { name: "Facebook", icon: FacebookLogo, url: "#" },
  { name: "Instagram", icon: InstagramLogo, url: "#" },
  { name: "LinkedIn", icon: LinkedinLogo, url: "#" },
  { name: "TikTok", icon: TiktokLogo, url: "#" },
  { name: "Threads", icon: InstagramLogo, url: "#" },
];
