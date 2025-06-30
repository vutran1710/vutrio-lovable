import { getPageViews } from "@/lib/pageViews";

export async function PageViewCounter({ slug }: { slug: string }) {
  const views = await getPageViews(slug); // Read-only

  return (
    <span className="text-sm text-background">
      {views === null ? "—" : `${views.toLocaleString()} visits`}
    </span>
  );
}
