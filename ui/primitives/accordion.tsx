"use client";
import * as React from "react";
import {
  Root as Accordion,
  Item as AccordionItemBase,
  Header,
  Trigger as AccordionTriggerBase,
  Content as AccordionContentBase,
} from "@radix-ui/react-accordion";
import { ArrowDown } from "phosphor-react";
import { cn } from "@/lib/utils";

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionItemBase>,
  React.ComponentProps<typeof AccordionItemBase>
>(({ className, ...props }, ref) => (
  <AccordionItemBase
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionTriggerBase>,
  React.ComponentProps<typeof AccordionTriggerBase>
>(({ className, children, ...props }, ref) => (
  <Header className="flex">
    <AccordionTriggerBase
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionTriggerBase>
  </Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionContentBase>,
  React.ComponentProps<typeof AccordionContentBase>
>(({ className, children, ...props }, ref) => (
  <AccordionContentBase
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionContentBase>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
