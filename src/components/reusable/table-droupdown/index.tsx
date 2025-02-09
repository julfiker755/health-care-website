"use client"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';


interface actionProps{
    type: 'link' | 'button';
    label: string;
    to?: string;
    onClick?: () => void;
}

export function DroupdownActions({ actions = [] }:{actions:actionProps[]}) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger  className='border-none' asChild>
        <button>
            <h1 className='px-3'> <MoreHorizontal className="h-4 w-4" /></h1>
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        {actions.map((action, index) =>
            action.type === 'link' ? (
                <Link key={index} href={action.to || ''}>
                    <DropdownMenuItem className="cursor-pointer">{action.label}</DropdownMenuItem>
                </Link>
            ) : (
                <DropdownMenuItem
                    key={index}
                    onClick={() => action.onClick && setTimeout(action.onClick, 1)}
                    className={'cursor-pointer hover:bg-gray-100'}
                >
                    {action.label}
                </DropdownMenuItem>
            )
        )}
    </DropdownMenuContent>
</DropdownMenu>
  )
}
