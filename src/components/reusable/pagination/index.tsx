"use client"
import ResponsivePagination from 'react-responsive-pagination';
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    totalPage: number;
    per_page: number;
    className?: string;
}

export default function Pagination({ page,onPageChange, totalPage, per_page,className}:PaginationProps) {
    const total = Math.ceil(totalPage / per_page)
    return (
        <div className={cn("w-full", className)}>
            <ResponsivePagination
            previousLabel={<ChevronLeft className="h-4 w-4" />} nextLabel={<ChevronRight className="h-4 w-4" />}
            className="flex flex-row gap-1 w-fit"
            pageItemClassName="h-10 border w-10 flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            pageLinkClassName="h-10 w-10 flex items-center justify-center"
            activeItemClassName="bg-accent border rounded-md"
            disabledItemClassName="hover:!bg-transparent"
            current={page}
            total={total}
            onPageChange={onPageChange}
        />
        </div>
    )
}