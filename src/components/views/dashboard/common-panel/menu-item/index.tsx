import {
  LayoutDashboard,
  Settings,
  Ratio,
  UserRound,
  UsersRound,
  PackagePlus,
} from "lucide-react";

interface MenuSubProps {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
}

type MenuItemProps = {
  [key: string]: MenuSubProps[];
};

const menuItem: MenuItemProps = {
  SUPER_ADMIN: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/super-admin",
    },
    {
      name: "User",
      icon: UsersRound,
      path: "/dashboard/super-admin/user",
    },
    {
      name: "Admin",
      icon: UserRound,
      path: "/dashboard/super-admin/admin",
    },
    {
      name: "Solution",
      icon: Ratio,
      path: "/dashboard/super-admin/solution",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/super-admin/settings",
    },
  ],
  ADMIN: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/admin",
    },
    {
      name: "Doctors",
      icon: UserRound,
      path: "/dashboard/admin/doctor",
    },
    {
      name: "User",
      icon: UsersRound,
      path: "/dashboard/admin/user",
    },
    {
      name: "Specialities",
      icon: PackagePlus,
      path: "/dashboard/admin/specialities",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/admin/settings",
    },
  ],
  DOCTOR: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/doctor",
    },
    {
      name: "Patint",
      icon: UserRound,
      path: "/dashboard/admin/doctor",
    },
  ],
  PATIENT: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/patinet",
    },
  ],
};

export default function MenuList(role: string): MenuSubProps[] {
  return menuItem[role] || [];
}
