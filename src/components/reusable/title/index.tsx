import { cn } from "@/lib/utils";
import React from "react";

interface titleProps {
  className?: string;
  textStyle?: string;
  titleStyle?: string;
  title: string;
  text?: string;
}

export function Title({
  className,
  textStyle,
  titleStyle,
  title,
  text,
}: titleProps) {
  return (
    <div className={cn("text-center pb-5", className)}>
      <h1 className={cn("text-2xl lg:text-3xl font-semibold", titleStyle)}>
        {title}
      </h1>
      {text && (
        <p
          className={cn("text-base  text-gray-900 max-w-xl m-auto", textStyle)}
        >
          {text}
        </p>
      )}
    </div>
  );
}
