// components/PageViewCounter.tsx
"use client";

import { useEffect, useState } from "react";

export function PageViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, [slug]);

  return (
    <span className="text-sm text-gray-500">
      {views === null ? "—" : `${views.toLocaleString()} views`}
    </span>
  );
}
