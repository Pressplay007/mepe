import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const parseValue = (value?: string): Date | undefined => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const DateTimePicker = ({
  value,
  onChange,
  placeholder = "Select date & time",
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(() => parseValue(value));
  const [time, setTime] = useState<string>(() => {
    const parsed = parseValue(value);
    return parsed ? format(parsed, "HH:mm") : "";
  });

  useEffect(() => {
    const parsed = parseValue(value);
    if (parsed) {
      setDate(parsed);
      setTime(format(parsed, "HH:mm"));
    } else if (!value) {
      setDate(undefined);
      setTime("");
    }
  }, [value]);

  const emit = (nextDate: Date | undefined, nextTime: string) => {
    if (!nextDate) {
      onChange("");
      return;
    }
    const combined = new Date(nextDate);
    if (nextTime) {
      const [hours, minutes] = nextTime.split(":").map(Number);
      combined.setHours(hours || 0, minutes || 0, 0, 0);
      onChange(format(combined, "MMMM d, yyyy h:mm a"));
    } else {
      onChange(format(combined, "MMMM d, yyyy"));
    }
  };

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    emit(selected, time);
  };

  const handleTimeChange = (next: string) => {
    setTime(next);
    emit(date, next);
  };

  const display = value || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex w-full items-center rounded-[10px] border border-mda-maroon/5 bg-mda-cream/30 py-5 pl-14 pr-6 text-left text-sm text-mda-maroon transition-all focus:border-mda-pink focus:outline-none data-[state=open]:border-mda-pink"
        >
          <CalendarIcon
            className="absolute left-5 top-1/2 -translate-y-1/2 text-mda-maroon/20"
            size={18}
          />
          <span className={cn(!value && "text-mda-maroon/40")}>{display}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-[18rem]"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          defaultMonth={date}
          autoFocus
        />
        <div className="flex items-center gap-3 border-t border-mda-maroon/10 p-4">
          <Clock className="text-mda-maroon/40" size={16} />
          <input
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="flex-1 rounded-[10px] border border-mda-maroon/10 bg-mda-cream/30 px-4 py-2.5 text-sm text-mda-maroon focus:border-mda-pink focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-[10px] bg-mda-maroon px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-mda-maroon/90"
          >
            Done
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
