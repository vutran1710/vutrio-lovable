"use client";

import { PaginationWrapper, ShootsPageBody } from "@/ui";
import type { ShootPost } from "@/lib/types";
import { notFound, useSearchParams } from "next/navigation";

const shootsContent: ShootPost[] = [
  {
    id: 1,
    imageUrl: "/placeholder.svg",
    caption: "Golden hour reflections in the city",
    likes: 124,
    date: "2024-01-15",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example1",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg",
    caption: "Morning coffee and contemplation",
    likes: 89,
    date: "2024-01-12",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example2",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg",
    caption: "Street art tells stories",
    likes: 156,
    date: "2024-01-10",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example3",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg",
    caption: "Nature's geometry",
    likes: 203,
    date: "2024-01-08",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example4",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg",
    caption: "Urban solitude",
    likes: 178,
    date: "2024-01-05",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example5",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg",
    caption: "Light and shadow dance",
    likes: 245,
    date: "2024-01-03",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example6",
  },
  {
    id: 7,
    imageUrl: "/placeholder.svg",
    caption: "Muted echoes of a rainy day",
    likes: 132,
    date: "2024-01-02",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example7",
  },
  {
    id: 8,
    imageUrl: "/placeholder.svg",
    caption: "Footsteps in forgotten alleys",
    likes: 97,
    date: "2024-01-01",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example8",
  },
  {
    id: 9,
    imageUrl: "/placeholder.svg",
    caption: "Stillness at the edge of dusk",
    likes: 176,
    date: "2023-12-29",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example9",
  },
  {
    id: 10,
    imageUrl: "/placeholder.svg",
    caption: "Concrete dreams and neon breath",
    likes: 201,
    date: "2023-12-26",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example10",
  },
  {
    id: 11,
    imageUrl: "/placeholder.svg",
    caption: "Silhouettes fading into fog",
    likes: 118,
    date: "2023-12-24",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example11",
  },
  {
    id: 12,
    imageUrl: "/placeholder.svg",
    caption: "Through a cracked window",
    likes: 143,
    date: "2023-12-22",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example12",
  },
  {
    id: 13,
    imageUrl: "/placeholder.svg",
    caption: "Traces of laughter in old stairwells",
    likes: 109,
    date: "2023-12-20",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example13",
  },
  {
    id: 14,
    imageUrl: "/placeholder.svg",
    caption: "Beneath flickering streetlamps",
    likes: 165,
    date: "2023-12-18",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example14",
  },
  {
    id: 15,
    imageUrl: "/placeholder.svg",
    caption: "Worn paths and whispered memories",
    likes: 154,
    date: "2023-12-16",
    type: "instagram",
    sourceUrl: "https://instagram.com/p/example15",
  },
  {
    id: 16,
    imageUrl: "/placeholder.svg",
    caption: "Still frames from fleeting hours",
    likes: 189,
    date: "2023-12-14",
    type: "tiktok",
    sourceUrl: "https://tiktok.com/@example/video/example16",
  },
];

const POSTS_PER_PAGE = 6;

function getPageParam(): number {
  const params = useSearchParams();
  const page = params.get("page");
  const pageNumber = parseInt(page || "1", 10);
  return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
}

export default function Shoots() {
  const currentPage = getPageParam();
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const paginatedContent = shootsContent.slice(start, end);
  const totalPages = Math.ceil(shootsContent.length / POSTS_PER_PAGE);

  // Edge case: page param exceeds available pages
  if (currentPage > totalPages) notFound();

  return (
    <>
      <ShootsPageBody content={paginatedContent} />
      <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
