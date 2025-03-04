"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

type AnimatedTextProps = {
  children: string;
  className?: string;
  scrollRepect?: boolean;
  component?: keyof JSX.IntrinsicElements;
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

export const AnimatedText = ({
  children,
  component = "h1",
  scrollRepect = true,
  className,
}: AnimatedTextProps) => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: scrollRepect, amount: 0.5 });
  //  const MotionTag = motion(component);
  const MotionTag = component === "h1" ? motion.h1 : motion.p;
  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.1 }}
      aria-hidden
      className={cn("text-base font-normal", className)}
    >
      {children.split("").map((char, index) => (
        <motion.span
          className="inline-block"
          key={index}
          variants={defaultAnimations}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
};
