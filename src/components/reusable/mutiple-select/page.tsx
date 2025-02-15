"use client";
import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Label,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "@/components/ui";

import { useRef, useState } from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

interface FormInputProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  name,
  label,
  placeholder,
  className,
  options,
}: FormInputProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => {
        const selectedValues = Array.isArray(value) ? value : [];

        const handleSelect = (selected: string) => {
          onChange(
            selectedValues.includes(selected)
              ? selectedValues.filter((v) => v !== selected)
              : [...selectedValues, selected]
          );
        };

        const removeSelection = (selected: string, event: React.MouseEvent) => {
          event.stopPropagation();
          onChange(selectedValues.filter((v) => v !== selected));
        };

        return (
          <div>
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  ref={popoverRef}
                  className={cn(
                    "flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2 py-2 text-sm focus:border-[#0e82fd] ring-offset-background placeholder:text-muted-foreground text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                    className
                  )}
                >
                  {selectedValues.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {selectedValues.slice(0, 2).map((selected) => (
                        <Badge variant="outline" key={selected}>
                          {options.find((f) => f.value === selected)?.label}
                          <X
                            onClick={(e) => removeSelection(selected, e)}
                            className="ml-1 h-3 w-3 cursor-pointer"
                          />
                        </Badge>
                      ))}
                      {selectedValues.length > 2 && (
                        <Badge variant="outline">
                          + {selectedValues.length - 2}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="mr-3">{placeholder}</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="p-1"
                style={{
                  width: popoverRef.current?.offsetWidth ?? "auto",
                }}
              >
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          className="px-0 gap-0 flex items-center"
                          key={option.value}
                          onSelect={() => handleSelect(option.value)}
                        >
                          <Check
                            className={cn(
                              "mr-[2px] h-4 w-3",
                              selectedValues.includes(option.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
}
