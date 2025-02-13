"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { useGetSingleProfileQuery } from "@/redux/api/commonApi";
import { localStroageRemove, PathRoute} from "@/lib/utils";
import Image from "next/image";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { authKey, refreshKey } from "@/contants";
import { useRouter } from "next/navigation";
import useAuth from "@/components/context/auth-info";


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
const AccessAuth= () => {
  const {setAuthInfo}=useAuth()
  const { data: profile, isLoading } = useGetSingleProfileQuery({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router=useRouter()

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
  const profileSubData:ProfileProps[] = [
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
    deleteCookies([authKey,refreshKey]);
    setAuthInfo(null)
    router.refresh()
    router.push("/")
  };
  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button
        ref={triggerRef}
        className="flex items-center gap-2 cursor-default"
      >
        <span className="hidden text-right lg:block">
          <span className="block capitalize text-sm font-medium black">
            {profile?.name}
          </span>
          <span className="block text-xs  text-black">
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
            <UserRound className="text-gray-500" size={30} />
          )}
        </span>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-[99] right-0 mt-4 flex w-[200px] flex-col rounded-lg border border-gray-200 bg-white shadow-md transition-all"
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
        </div>
      )}
    </div>
  );
};

export default AccessAuth;
