"use client";
import {
  Table as TableArea,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";
import { DashTitle } from "../dash-title";

interface tableProps {
  title: string;
  description?: string;
  className?: string;
  headers: string[];
  children: React.ReactNode;
  pagination?: any;
  rightSec?:any
}

export const Table = ({
  className,
  title,
  description,
  headers = [],
  pagination,
  children,
  rightSec
}: tableProps) => {
  return (
    <div className={cn("mt-4", className)}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <DashTitle title={title} description={description} />
        {rightSec && rightSec}
      </div>
      <div className={"mt-3 border rounded-lg"}>
        <TableArea>
          {headers && headers.length > 0 && (
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead
                    className="first:rounded-tl-lg last:rounded-tr-lg"
                    key={index}
                  >
                    <h1 className="w-max capitalize">{header}</h1>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>{children}</TableBody>
        </TableArea>
      </div>
      <div className="flex justify-end mt-4">{pagination}</div>
    </div>
  );
};
