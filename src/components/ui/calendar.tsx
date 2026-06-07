import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaults = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: cn(defaults.months, "relative flex flex-col gap-4"),
        month: cn(defaults.month, "flex flex-col gap-4"),
        month_caption: cn(
          defaults.month_caption,
          "flex h-9 items-center justify-center px-9",
        ),
        caption_label: cn(
          defaults.caption_label,
          "text-sm font-bold uppercase tracking-widest text-mda-maroon",
        ),
        nav: cn(defaults.nav, "absolute inset-x-0 top-0 flex items-center justify-between"),
        button_previous: cn(
          defaults.button_previous,
          "inline-flex size-9 items-center justify-center rounded-[10px] text-mda-maroon/60 transition-colors hover:bg-mda-cream/60 hover:text-mda-maroon disabled:opacity-30",
        ),
        button_next: cn(
          defaults.button_next,
          "inline-flex size-9 items-center justify-center rounded-[10px] text-mda-maroon/60 transition-colors hover:bg-mda-cream/60 hover:text-mda-maroon disabled:opacity-30",
        ),
        month_grid: cn(defaults.month_grid, "w-full border-collapse"),
        weekdays: cn(defaults.weekdays, "flex"),
        weekday: cn(
          defaults.weekday,
          "w-9 text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40",
        ),
        week: cn(defaults.week, "mt-1 flex w-full"),
        day: cn(defaults.day, "size-9 p-0 text-center text-sm"),
        day_button: cn(
          defaults.day_button,
          "inline-flex size-9 items-center justify-center rounded-[10px] font-medium text-mda-maroon transition-colors hover:bg-mda-cream/70 aria-selected:bg-mda-maroon aria-selected:text-white aria-selected:hover:bg-mda-maroon",
        ),
        today: cn(defaults.today, "font-bold text-mda-pink"),
        outside: cn(defaults.outside, "text-mda-maroon/20"),
        disabled: cn(defaults.disabled, "opacity-30"),
        hidden: cn(defaults.hidden, "invisible"),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="size-4" />
        },
      }}
      {...props}
    />
  )
}

export { Calendar }
