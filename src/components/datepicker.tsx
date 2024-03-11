import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LuCalendar } from "react-icons/lu";
import { Calendar } from "./ui/calendar";
import React from "react";
import { type DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start border-zinc-500 bg-zinc-800 text-left font-normal hover:bg-zinc-700 hover:text-white",
              !date && "text-muted-foreground",
            )}
          >
            <LuCalendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto bg-zinc-700 p-0 text-white"
          align="start"
        >
          <Calendar
            classNames={{
              cell: "bg-transparent",
              day_range_middle: "bg-zinc-500",
            }}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
