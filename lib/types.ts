export interface LogbookPost {
  id: string;
  slug: string;
  title: string;
  date: Date;
  cover: string;
  excerpt?: string;
  content?: string;
  tags: string[];
  views?: number;
  likes?: number;
  comments?: number;
}

export interface LogbookStats {
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
  description?: string;
  likes: number;
  date: Date;
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
  date: Date;
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
