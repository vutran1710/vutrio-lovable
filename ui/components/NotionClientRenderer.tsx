"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";

export default function NotionClientRenderer({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
  );
}
