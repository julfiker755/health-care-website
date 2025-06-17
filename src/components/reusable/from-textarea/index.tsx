"use client";
import { CircleAlert } from "lucide-react";
import {
  Controller,
  useFormContext,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { Label, Textarea } from "@/components/ui";

interface formInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function FromTextArea({
  name,
  label,
  placeholder,
  className,
}: formInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div>
          {label && <Label>{label}</Label>}
          <div className="relative">
            <Textarea
              className={className}
              {...field}
              placeholder={placeholder}
            ></Textarea>
          </div>
          {error?.message && (
            <h3 className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </h3>
          )}
        </div>
      )}
    />
  );
}
