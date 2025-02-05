"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, UserCheck, Contact, Settings, LogOut } from "lucide-react";

interface ProfileSubData {
  id: number;
  path: string;
  pathname: string;
  icon: JSX.Element;
}

const DropdownUser: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  // Profile submenu data
  const profileSubData: ProfileSubData[] = [
    {
      id: 1,
      path: "/profile",
      pathname: "My Profile",
      icon: <UserCheck size={20} />,
    },
    {
      id: 2,
      path: "/contacts",
      pathname: "My Contacts",
      icon: <Contact size={20} />,
    },
    {
      id: 3,
      path: "/settings",
      pathname: "Account Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button
        ref={triggerRef}
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-white">
            Thomas Anree
          </span>
          <span className="block text-xs text-white">UX Designer</span>
        </span>

        <span className="h-10 w-10 flex items-center rounded-full">
          <User color="white" size={35} />
        </span>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-4 flex w-[220px] flex-col rounded-lg border border-gray-200 bg-white shadow-md transition-all"
        >
          <ul className="flex flex-col gap-5 border-b border-gray-200 px-6 py-5">
            {profileSubData.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="flex items-center gap-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-blue-500"
                >
                  {item.icon}
                  {item.pathname}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium text-gray-700 transition-colors hover:text-red-500 w-full text-left"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
