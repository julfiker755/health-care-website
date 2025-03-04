"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

type FadeDirection = "fade_up" | "fade_down" | "fade_right" | "fade_left";

type Props = {
  children: React.ReactNode;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
  scrollRepect?: boolean;
  animate?: FadeDirection;
};

export function Fade({
  animate = "fade_up",
  component = "div",
  scrollRepect = true,
  className,
  children,
  ...props
}: Props) {
  const MotionTag = motion(component);

  const initialPosition = {
    fade_up: { opacity: 0, y: 30 },
    fade_down: { opacity: 0, y: -30 },
    fade_right: { opacity: 0, x: 30 },
    fade_left: { opacity: 0, x: -30 },
  };
  const viewPosition = {
    fade_up: { opacity: 1, y: 0 },
    fade_down: { opacity: 1, y: 0 },
    fade_right: { opacity: 1, x: 0 },
    fade_left: { opacity: 1, x: 0 },
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
