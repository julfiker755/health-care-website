"use client";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import { authKey, authToken, refreshKey } from "@/contants";
import useAuth from "@/components/context/auth-info";
import React, { useEffect, useState } from "react";
import { localStroageRemove } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

interface Navprops {
  id: string;
  name: string;
  path: string;
}

export default function Navbar() {
  const controls = useAnimation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { authInfo, setAuthInfo } = useAuth();
  const AuthInfo = dynamic(() => import("@/components/common/access-auth"), {
    ssr: false,
  });

  const items: Navprops[] = [
    { id: crypto.randomUUID(), name: "Home", path: "/" },
    { id: crypto.randomUUID(), name: "Doctors", path: "/doctors" },
    { id: crypto.randomUUID(), name: "Blog", path: "/" },
  ];

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const handleScroll = () => {
      const hasScrolled = window.scrollY > 0;
      navbar?.classList.toggle("shadow-md", hasScrolled);
      navbar?.classList.toggle("shadow-gray-200/60", hasScrolled);
      controls.start({
        top: hasScrolled ? "0px" : "-50px",
        transition: { duration: 0.8 },
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <>
      <motion.div
        animate={controls}
        id="navbar"
        className="sticky bg-white z-50 top-0 left-0"
      >
        <div className="container flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-extrabold text-[#0e82fd]">
                Health Care
              </h1>
            </Link>
          </div>
          <ul className="hidden lg:flex space-x-5">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          {authInfo ? (
            <div className="hidden lg:block">
              <AuthInfo />
            </div>
          ) : (
            <Link href="/auth">
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
      </motion.div>

      {/* Small Device Menu */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0e82fd] text-white z-50 flex flex-col items-center justify-center"
            initial={{
              opacity: 0,
              clipPath: "polygon(100% 0, 100% 0, 0 100%, 0 100%)",
            }}
            animate={{
              opacity: 1,
              clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0)",
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              clipPath: "polygon(100% 0, 100% 0, 0 100%, 0 100%)",
              transition: { duration: 0.4, ease: "easeIn" },
            }}
          >
            <X
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-4 right-4"
            />
            <ul className="flex flex-col items-center gap-4">
              {items.map((item) => (
                <li key={item.id}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
            {authInfo ? (
              <Button
                onClick={() => {
                  localStroageRemove(authKey);
                  deleteCookies([authToken, refreshKey]);
                  setAuthInfo(null);
                  router.refresh();
                  router.push("/");
                }}
                size="lg"
                className="mt-3"
              >
                Log Out
              </Button>
            ) : (
              <Link href="/auth">
                <Button size="lg" className="mt-3">
                  Login
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
