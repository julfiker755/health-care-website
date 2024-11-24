import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import * as React from "react"



const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0087BE] hover:bg-[#0087BE]/90 text-white",
        danger:
          "bg-[#dc3545] text-white shadow-sm hover:bg-[#dc3545]/90",
        success:
          "bg-[#198754] text-white shadow-sm hover:bg-[#198754]/90",
        info:
          "bg-[#0dcaf0] text-black shadow-sm hover:bg-[#0dcaf0]/90",
        secondary:
          "bg-[#6c757d] text-white shadow-sm hover:bg-[#6c757d]/90",
        outline:
          "border-2 border-input text-[#0087BE] border-[#0087BE] shadow-sm hover:bg-[#0087BE] hover:text-white",
        link:
         "text-[#6ea8fe] underline underline-offset-2 hover:text-[#6ea8fe]/90",
      },
      size: {
        default: "grid place-items-center h-9  px-4 py-2",
        sm: "grid place-items-center h-8 rounded-md px-3 text-xs",
        lg: "grid place-items-center h-10 rounded-md px-8",
        icon: "grid place-items-center h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
