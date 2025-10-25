import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface dataItem {
  value: string;
  id: string;
}

interface SearchSelectInputProps {
  dataArr: dataItem[];
  placeholder: string;
  value?: string;
  onChange?: (id: string) => void;
}

function SearchSelectInput({
  dataArr,
  placeholder,
  value,
  onChange,
}: SearchSelectInputProps) {
  const [open, setOpen] = React.useState(false);

  const displayValue = dataArr.find((item) => item.id === value)?.value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            displayValue
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search movie..." />
          <CommandList>
            <CommandEmpty>No movie found.</CommandEmpty>
            <CommandGroup>
              {dataArr.map((dataItem) => (
                <CommandItem
                  className="cursor-pointer"
                  key={dataItem.id}
                  value={dataItem.value}
                  onSelect={(currentValue) => {
                    const selectedItem = dataArr.find(
                      (item) =>
                        item.value.toLowerCase() === currentValue.toLowerCase()
                    );

                    if (selectedItem) {
                      onChange?.(selectedItem.id);
                    }

                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === dataItem.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {dataItem.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SearchSelectInput;
