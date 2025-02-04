'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, LayoutDashboard, Settings, Table, Boxes } from 'lucide-react';

interface sidebarProps {
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
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="py-3">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/">
            <img
              className="w-24"
              src="https://kutty.netlify.app/brand/kutty-logo-white.png"
              alt="Logo"
            />
          </Link>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="lg:hidden"
          >
            <X size={30} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-5 px-4">
          <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">Menu</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
                <Settings size={20} /> Settings
              </Link>
            </li>
            <li>
              <Link href="/tables" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
                <Table size={20} /> Tables
              </Link>
            </li>
            <li>
              <Link href="/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
                <Boxes size={20} /> Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};



export default Sidebar