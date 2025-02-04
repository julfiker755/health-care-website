"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";

interface filterProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterMenu({ title, children }: filterProps) {
  return (
    <Accordion type="single" defaultValue="item-3" collapsible>
      <AccordionItem value="item-3">
        <AccordionTrigger className="py-2 font-medium">{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
