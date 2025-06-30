import { getPageViews } from "@/lib/pageViews";
import { IncrementPageView } from "./IncrementPageView";

export async function PageViewCounter({ slug }: { slug: string }) {
  const views = await getPageViews(slug); // Read-only

  return (
    <>
      <span className="text-sm text-background">
        {views === null ? "—" : `${views.toLocaleString()} visited`}
      </span>
      <IncrementPageView slug={slug} />
    </>
  );
}
