"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { usePathname } from "next/navigation";
import useAuth from "@/components/context/auth-info";
import MenuList from "../menu-item";

export interface sidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: any) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: sidebarProps) => {
  const { authInfo } = useAuth();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
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
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[10] flex h-screen w-56 flex-col overflow-y-hidden bg-[#038bd9] text-black transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="py-3">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-2">
          <div className="w-[140px] h-[30px] flex items-center">
            <Link href="/">
            <h1 className="text-2xl font-extrabold text-[white]">Health Care</h1>
            </Link>
          </div>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="lg:hidden"
          ></button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-2">
          <ul className="space-y-2">
            {MenuList(authInfo?.role as string).map((item, index) => (
              <li key={index}>
                <Link
                  href={item?.path}
                  className={`flex items-center gap-3 p-2 text-white ${
                    pathname === item.path && "bg-[#2da6ed]"
                  }`}
                >
                  <item.icon size={20} /> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
