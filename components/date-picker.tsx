import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DatePickerProps {
  onSelect?: (date: Date) => void;
}

export function DatePicker({ onSelect }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onSelect?.(date);
    }
  };

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px] [&_[role=gridcell]]:cursor-pointer"
          selected={selectedDate}
          onSelect={(range: DateRange | undefined) => handleDateChange(range?.from)}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
