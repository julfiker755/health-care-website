import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

interface CalendarFormProps {
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabledDates?: (date: Date) => boolean;
  className?: string;
}

export function CalendarTable({
  selectedDate,
  onDateChange,
  placeholder = "Pick a date",
  className,
}: CalendarFormProps) {
  // const today = new Date();
  // const isDisabled = (date: Date) => ); 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-white px-1",
            !selectedDate && "",
            className
          )}
        >
          {selectedDate ? (
            format(selectedDate, "dd/MM/yyyy")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          disabled={(date: Date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
