"use client";
import useAuth from "@/components/context/auth-info";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import assets from "@/assets";
import dynamic from "next/dynamic";

interface Navprops {
  id: string;
  name: string;
  path: string;
}

export default function Navber() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const { authInfo } = useAuth();
  const AuthInfo = dynamic(() => import("@/components/common/access-auth"), {
    ssr: false,
  });

  const items: Navprops[] = [
    { id: crypto.randomUUID(), name: "Home", path: "/" },
    { id: crypto.randomUUID(), name: "Doctors", path: "/doctors" },
    { id: crypto.randomUUID(), name: "Patients", path: "/" },
    { id: crypto.randomUUID(), name: "Blog", path: "/" },
  ];

  return (
    <nav className="container">
      <div className="flex justify-between items-center py-2">
        <div className="w-[140px] h-[35px] flex items-center">
          <Image src={assets.images.logo} width={140} height={100} alt="logo" />
        </div>
        <ul className="hidden lg:flex space-x-5">
          {items?.map((item: any) => (
            <li key={item.id}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        {!!authInfo ? (
          <AuthInfo />
        ) : (
          <Link href={"/auth"}>
            <Button className="hidden px-5 lg:block" size="sm">
              Login
            </Button>
          </Link>
        )}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="block cursor-pointer lg:hidden"
        >
          {isOpen ? <X /> : <AlignJustify />}
        </div>
      </div>
      {/* small divice */}
      <div
        className={`fixed navMenu inset-0 bg-[#0f50dc] z-50 flex flex-col items-center justify-center     lg:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <X
          onClick={() => setIsOpen(!isOpen)}
          className="absolute cursor-pointer top-4 right-4"
        />
        <ul className="flex flex-col items-center gap-4">
          {items?.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <Link href={"/auth"}>
          <Button size={"lg"} className="mt-3">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}
