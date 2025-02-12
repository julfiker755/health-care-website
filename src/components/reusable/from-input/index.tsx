"use client";
import React, { useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import {
  Controller,
  useFormContext,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { Input, Label } from "@/components/ui";

interface formInputProps {
  name: string;
  type?: string;
  label?: string;
  eye?: boolean;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export function FromInput({
  name,
  type = "text",
  eye = false,
  label,
  readOnly = false,
  placeholder,
  className,
}: formInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(true);
  const { control } = useFormContext();

  const inputType = eye && isPasswordVisible ? "password" : type;

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
            <Input
              className={className}
              {...field}
              type={inputType}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            {eye && (
              <h1
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute cursor-pointer  top-[6px] right-2"
              >
                {isPasswordVisible ? (
                  <EyeOff className="text-muted-foreground" size={20} />
                ) : (
                  <Eye className="text-muted-foreground" size={20} />
                )}
              </h1>
            )}
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
