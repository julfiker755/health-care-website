'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, LayoutDashboard, Settings, Table, Boxes, PackagePlus} from 'lucide-react';
import Image from 'next/image';
import assets from '@/assets';

export interface sidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open:any) => void;
}

const Sidebar= ({ sidebarOpen, setSidebarOpen }:sidebarProps) => {
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[10] flex h-screen w-56 flex-col overflow-y-hidden bg-[#038bd9] text-black transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="py-3">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-2">
          <Link href="/">
          <Image
          src={assets.images.logo2}
          className=''
          width={140}
          height={100}
          alt="logo"
        />
          </Link>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="lg:hidden"
          >
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-2">
          <ul className='space-y-2'>
            <li>
              <Link href="/dashboard/admin" className="flex items-center gap-3 p-2 hover:text-white text-white bg-[#2da6ed]">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/doctor" className="flex items-center gap-3 p-2 hover:text-white text-white bg-[#2da6ed]">
                <LayoutDashboard size={20} /> Doctors
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/specialities" className="flex items-center gap-3 p-2 hover:text-white text-white bg-[#2da6ed]">
                <PackagePlus size={20} /> Specialities
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};



export default Sidebar