import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface SheetProps {
  className?:string,
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen:boolean,
  setIsOpen: (open: boolean) => void
}

export function SheetDrawer({ children,className,title, description, isOpen=false,setIsOpen}:SheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent autoFocus>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className={cn('mt-3',className)}>{children}</div>
      </SheetContent>
    </Sheet>
  );
}

