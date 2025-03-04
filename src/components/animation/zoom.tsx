"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

type FadeDirection = "zoom_in" | "zoom_in_up" | "zoom_in_down";

type Props = {
  children: React.ReactNode;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
  scrollRepect?: boolean;
  animate?: FadeDirection;
};

export function Zoom({
  animate = "zoom_in",
  component = "div",
  scrollRepect = true,
  className,
  children,
  ...props
}: Props) {
  const MotionTag = motion(component);

  const initialPosition = {
    zoom_in: { opacity: 0, scale: 0.8 },
    zoom_in_up: { opacity: 0, scale: 0.8, y: 30 },
    zoom_in_down: { opacity: 0, scale: 0.8, y: -30 },
  };

  const viewPosition = {
    zoom_in: { opacity: 1, scale: 1 },
    zoom_in_up: { opacity: 1, scale: 1, y: 0 },
    zoom_in_down: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <MotionTag
      className={cn("font-normal", className)}
      initial={initialPosition[animate]}
      whileInView={viewPosition[animate]}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: scrollRepect, amount: 0.2 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
