import { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  summary?: ReactNode;
  logo?: ReactNode;
}

export const PageHeader = ({ title, summary, logo }: PageHeaderProps) => (
  <div className="mb-12 mt-8">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
      <div className="flex-1">
        <h1 className="font-display text-4xl font-bold text-primary md:mb-0">
          {title}
        </h1>
        {summary && (
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mt-4 italic">
            {summary}
          </p>
        )}
        {logo && (
          <div className="md:hidden flex justify-center mt-6">{logo}</div>
        )}
      </div>
      {logo && <div className="hidden md:block md:ml-8">{logo}</div>}
    </div>
  </div>
);
