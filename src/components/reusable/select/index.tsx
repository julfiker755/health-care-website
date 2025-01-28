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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"

interface formInputProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
}

export  function SingleSelect({
  name,
  label,
  placeholder,
}: formInputProps) {
  const { control } = useFormContext();

  const gender=[
    {label:"Male",value:"MALE"},
    {label:"Female",value:"FEMALE"}
  ]

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div>
          {label && <Label>{label}</Label>}
          <Select 
           onValueChange={onChange}
           value={value || ""}
          >
      <SelectTrigger className="w-full">
        <SelectValue  placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
           {gender.map((item,index)=>(
            <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
           ))}
        </SelectGroup>
      </SelectContent>
    </Select>
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
