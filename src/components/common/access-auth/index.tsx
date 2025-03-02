"use client";
import { useGetSingleProfileQuery } from "@/redux/api/commonApi";
import { cn, localStroageRemove, PathRoute } from "@/lib/utils";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { authKey, authToken, refreshKey } from "@/contants";
import { AnimatePresence, motion } from "motion/react";
import useAuth from "@/components/context/auth-info";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProfileProps {
  id: number;
  path: string;
  pathname: string;
}

export const RoleName = (route: string) => {
  let name = "";
  switch (route) {
    case "SUPER_ADMIN":
      name = "Super Admin";
      break;
    case "ADMIN":
      name = "Admin";
      break;
    case "DOCTOR":
      name = "Doctor";
      break;
    case "PATIENT":
      name = "Patient";
      break;
    default:
      name = "";
  }
  return name;
};

// PathRoute
const AccessAuth = ({ className }: { className?: string }) => {
  const { setAuthInfo } = useAuth();
  const { data: profile, isLoading } = useGetSingleProfileQuery({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  // Profile submenu data
  const profileSubData: ProfileProps[] = [
    {
      id: 1,
      path: PathRoute(profile?.role),
      pathname: "Dashboard",
    },
    {
      id: 3,
      path: `${PathRoute(profile?.role)}/settings`,
      pathname: "Profile Settings",
    },
  ];
  // handleLogOut
  const handleLogOut = () => {
    localStroageRemove(authKey);
    deleteCookies([authToken, refreshKey]);
    setAuthInfo(null);
    router.refresh();
    router.push("/");
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button className="flex items-center gap-2 cursor-default">
        <span className="hidden text-right lg:block">
          <span
            className={cn(
              "block capitalize text-sm font-medium black",
              className
            )}
          >
            {profile?.name}
          </span>
          <span className={cn("block text-xs  text-black", className)}>
            {RoleName(profile?.role)}
          </span>
        </span>

        <span
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="h-10 w-10 flex border justify-center cursor-pointer items-center rounded-full"
        >
          {profile?.profilePhoto !== null ? (
            <Image
              className="w-full h-full rounded-full"
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile?.profilePhoto}`}
              width={80}
              height={100}
              alt={profile?.profilePhoto?.toString() + "-icon"}
            />
          ) : (
            <UserRound className={cn("text-gray-500", className)} size={30} />
          )}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence initial={false}>
        {dropdownOpen && (
          <motion.div
            className="absolute z-[99] right-0 mt-4 flex w-[200px] flex-col rounded-lg border border-gray-200 bg-white shadow-md transition-all"
            initial={{ opacity: 0, scale: 0, transformOrigin: "top right" }}
            animate={{ opacity: 1, scale: 1, transformOrigin: "top right" }}
            exit={{ opacity: 0, scale: 0, transformOrigin: "top right" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className="flex flex-col gap-5 border-b border-gray-200 px-5 py-4">
              {profileSubData.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="flex items-center  text-sm font-medium text-gray-700 transition-colors hover:text-blue-500"
                  >
                    {item.pathname}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleLogOut()}
              className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:text-red-500 w-full text-left"
            >
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessAuth;
