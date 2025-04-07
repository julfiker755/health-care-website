import React from "react";
import breadcrumb01 from "@/assets/breadcrumb-bg-01.png";
import breadcrumb02 from "@/assets/breadcrumb-bg-02.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface breadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className }: breadcrumbProps) {
  return (
    <div
      className={cn("text-center relative  py-14 mb-8 bg-[#f9fbff]", className)}
    >
      {children}
      <Image
        className="hidden lg:block absolute top-0 left-0"
        src={breadcrumb01}
        width={300}
        height={100}
        style={{
          height: "100%",
        }}
        alt="image1"
      />
      <Image
        className="hidden lg:block absolute top-0 right-0"
        src={breadcrumb02}
        width={300}
        height={100}
        style={{
          height: "100%",
        }}
        alt="image3"
      />
    </div>
  );
}
