"use client";
import React from "react";
import { CircleAlert } from "lucide-react";
import { Controller, useFormContext, FieldValues } from "react-hook-form";
import { Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FormFileProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function FileInput({ name, label, placeholder, className}:FormFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { onChange}, fieldState: { error } }) => (
        <div>
          {label && <Label>{label}</Label>}
          <div className="relative">
            <Input
              className={cn("py-1 px-2", className)}
              type="file"
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
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
