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
  pagination: any;
}

export const Table = ({
  className,
  title,
  description,
  headers = [],
  pagination,
  children,
}: tableProps) => {
  return (
    <div className={cn("mt-4", className)}>
      <DashTitle title={title} description={description} />
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
