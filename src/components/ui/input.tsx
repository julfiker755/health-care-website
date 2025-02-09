import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-sm border border-input bg-background px-3 py-2 text-base ring-offset-background file:bg-gray-200 file:text-gray-900 file:cursor-pointer file:border-none file:rounded-sm placeholder:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus:border-[#0e82fd] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
