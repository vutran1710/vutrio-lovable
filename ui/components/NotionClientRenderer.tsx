"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

export function NotionClientRenderer({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return <NotionRenderer recordMap={recordMap} fullPage={false} />;
}
