import { v2 as cloudinary } from "cloudinary";
import type { ShootPost } from "@/lib/types"; // or wherever you define them

export const PHOTO_FOLDER_NAME = "vutrio-shoots--photos";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function fetchPhotosByPage(
  pageNumber: number,
  pageLimit: number,
  folder: string,
): Promise<ShootPost[]> {
  if (pageNumber < 1) throw new Error("Page number must be ≥ 1");

  let nextCursor: string | undefined;

  for (let i = 1; i < pageNumber; i++) {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("created_at", "desc")
      .max_results(pageLimit)
      .next_cursor(nextCursor)
      .execute();

    if (!result.next_cursor) return [];
    nextCursor = result.next_cursor;
  }

  const pageResult = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by("created_at", "desc")
    .with_field("context")
    .max_results(pageLimit)
    .next_cursor(nextCursor)
    .execute();

  return (pageResult.resources || []).map((resource: any, index: number) => {
    const config = {
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "auto" },
        { fetch_format: "auto" },
      ],
      secure: true,
    };

    const context = resource.context;
    const caption = context.caption || "";
    const description = context.alt || "";

    return {
      id: index + 1 + (pageNumber - 1) * pageLimit,
      imageUrl: cloudinary.url(resource.public_id, config),
      caption,
      description,
      likes: parseInt(context.likes ?? "0", 10),
      date: new Date(resource.created_at),
      type: "instagram",
      sourceUrl: context.sourceUrl ?? resource.secure_url,
    } satisfies ShootPost;
  });
}

type CacheEntry = {
  data: ShootPost[];
  timestamp: number;
};

const photoCache = new Map<string, CacheEntry>();
const TTL = 60 * 20 * 1000; // 20 minutes in milliseconds

export async function cachedFetchPhotosByPage(
  page: number,
  limit: number,
  folder: string,
): Promise<ShootPost[]> {
  const key = `${folder}::${page}::${limit}`;
  const now = Date.now();

  const cached = photoCache.get(key);
  if (cached && now - cached.timestamp < TTL) {
    return cached.data;
  }

  const data = await fetchPhotosByPage(page, limit, folder);
  photoCache.set(key, { data, timestamp: now });

  return data;
}
