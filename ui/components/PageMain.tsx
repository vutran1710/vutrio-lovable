import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface PageMainProps {
  children: ReactNode;
}

export const PageMain = ({ children }: PageMainProps) => (
  <main className={cn("max-w-6xl mx-auto pt-24 px-6")}>{children}</main>
);
