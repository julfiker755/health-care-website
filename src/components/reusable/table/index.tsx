"use client"
import { Table as TableArea, TableBody,TableHead, TableHeader, TableRow } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";





interface tableProps {
  className?: string;
  headers: string[];
  children: React.ReactNode;
}

export const Table = ({ className, headers = [], children}: tableProps) => {
  return (
    <div className={cn("border rounded-lg", className)}>
      <TableArea>
        {headers && headers.length > 0 && (
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead className="first:rounded-tl-lg last:rounded-tr-lg" key={index}>
                  <h1 className="w-max capitalize">{header}</h1>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>{children}</TableBody>
      </TableArea>
    </div>
  );
};
