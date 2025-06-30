"use client";

import { useEffect } from "react";

export function IncrementPageView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      body: JSON.stringify({ page: slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
