"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "prismjs/themes/prism.css";

export function NotionClientRenderer({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return <NotionRenderer recordMap={recordMap} fullPage={false} />;
}
