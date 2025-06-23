export interface LogbookPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  cover: string;
  excerpt?: string;
  content?: string;
  tags: string[];
  views?: number;
  likes?: number;
  comments?: number;
}

export interface LogbookStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
}

export interface LogbookTag {
  name: string;
  count: number;
}

export interface RecentComment {
  author: string;
  content: string;
  post: string;
  time: string;
}

export type ShootType = "instagram" | "tiktok";
export interface ShootPost {
  id: number;
  imageUrl: string;
  caption: string;
  likes: number;
  date: string;
  type: ShootType;
  sourceUrl: string;
}

export interface WorkbenchPost {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  githubUrl: string;
  techStack: string[];
  tags: string[];
  stars: number;
}

export interface HomeRecentItem {
  type: string;
  title: string;
  description: string;
  coverUrl: string;
  date: Date;
  itemUrl: string;
}

export interface CollectionPreviewItem {
  title: string;
  description: string;
  posts: Array<{
    title: string;
    url: string;
  }>;
  color: string;
  url: string;
}
