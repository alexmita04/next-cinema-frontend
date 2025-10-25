import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerInterface {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

const DatePicker = ({ value, onChange }: DatePickerInterface) => {
  const [open, setOpen] = useState(false);

  const date = value;

  const handleSelect = (newDate: Date | undefined) => {
    onChange?.(newDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground max-w-[450px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          required={false}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
