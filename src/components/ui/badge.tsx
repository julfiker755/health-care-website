import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-[1px] text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white",
          // default:
          // "border-transparent bg-destructive text-white",
          no:
          "border-transparent bg-destructive text-white",
          yes:
          "border-transparent bg-green-600 text-white",
          success:
          "border-transparent bg-green-600 text-white",
         outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }


// default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
//                 secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
//                 destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
//                 outline: "border-foreground bg-background",
//                 active: "border-transparent bg-green-600 w-16 flex justify-center text-center  border rounded-xl text-white",
//                 approved:"border-transparent bg-green-600 w-16 flex justify-center text-center  border rounded-xl text-white",
//                 paid:"border-transparent bg-green-600 w-16 flex justify-center text-center border rounded-xl text-white",
//                 open:"border-transparent bg-green-600 w-16 flex justify-center text-center border rounded-xl text-white",
//                 inactive: "border-transparent bg-yellow-400 w-16 flex justify-center text-center border rounded-xl text-white",
//                 pending: "border-transparent bg-yellow-400 w-16 flex justify-center text-center border rounded-xl text-white",
//                 paused:"border-transparent bg-yellow-400 w-16 flex justify-center text-center border rounded-xl text-white",
//                 deleted:"border-transparent bg-red-500 w-16 flex justify-center text-center border rounded-xl text-white",
//                 expired:"border-transparent bg-red-500 w-16 flex justify-center text-center border rounded-xl text-white",
//                 suspended:"border-transparent bg-red-500 w-20 flex justify-center text-center border rounded-xl text-white",
//                 cancelled:"border-transparent bg-red-500 w-16 flex justify-center text-center border rounded-xl text-white",
//                 closed:"border-transparent bg-red-500 w-16 flex justify-center text-center border rounded-xl text-white",
//                 rejected:"border-transparent bg-red-500 w-16 flex justify-center text-center border rounded-xl text-white",