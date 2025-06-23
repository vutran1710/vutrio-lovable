import { redis } from "./upstash";

const isDev = process.env.NODE_ENV === "development";

export async function incrementPageView(slug: string): Promise<number> {
  if (isDev) return 0;
  const key = `views:${slug}`;
  return await redis.incr(key);
}

export async function getPageViews(slug: string): Promise<number> {
  if (isDev) return 0;
  const key = `views:${slug}`;
  return (await redis.get<number>(key)) ?? 0;
}
