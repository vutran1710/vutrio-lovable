import { cn } from "../lib/utils";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  className?: string;
  children: React.ReactNode;
};

export const Link = (props: LinkProps) => {
  return (
    <a
      {...props}
      href={props.to || "#"}
      className={cn(
        "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600",
        props.className,
      )}
    >
      {props.children}
    </a>
  );
};
