import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">{children}</div>
);
