import { BlockObjectResponse } from "@notionhq/client";

export interface BaseRecord {
  id: string;
  title: string;
  description: string;
  slug: string;
  cover: string;
  sourceUrl?: string;
  tags: string[];
  date: Date;
  recordType: "logbook" | "shoots" | "workbench";
}

export type LogbookPost = BaseRecord & {
  content?: BlockObjectResponse[];
  comments?: number;
};

export type ShootType = "insta" | "tiktok";

export type ShootPost = BaseRecord & {
  image?: string;
  likes: number;
  type: ShootType;
};

export type WorkbenchPost = BaseRecord & {
  cover: string;
  techStack: string[];
  tags: string[];
  stars: number;
};

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

export interface LogbookStats {
  totalViews: number;
  totalComments: number;
}

export interface RecentComment {
  author: string;
  content: string;
  post: string;
  time: string;
}
