"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

export function NotionClientRenderer({
  recordMap,
  className,
}: {
  recordMap: ExtendedRecordMap;
  className?: string;
}) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      bodyClassName={className}
    />
  );
}
