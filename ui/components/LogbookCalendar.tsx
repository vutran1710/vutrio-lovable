import React from "react";
import { Calendar } from "../primitives/calendar";

type LogbookCalendarProps = {
  datesWithPosts: Date[];
};

export const LogbookCalendar = ({ datesWithPosts }: LogbookCalendarProps) => {
  return (
    <div className="bg-card rounded-lg border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-semibold mb-4">Calendar</h3>
      <div className="w-full overflow-hidden">
        <Calendar
          mode="multiple"
          selected={datesWithPosts}
          modifiers={{
            hasPost: datesWithPosts,
          }}
          modifiersStyles={{
            hasPost: {
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--accent))",
              fontWeight: "bold",
            },
          }}
          className="w-full mx-auto"
        />
      </div>
    </div>
  );
};
