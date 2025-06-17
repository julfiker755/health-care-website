import {
  LayoutDashboard,
  Settings,
  Ratio,
  UserRound,
  UsersRound,
  PackagePlus,
  NotepadText,
  Dock,
  Newspaper,
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
      name: "Schedule",
      icon: NotepadText,
      path: "/dashboard/admin/schedule",
    },
    {
      name: "Doctor",
      icon: UserRound,
      path: "/dashboard/admin/doctor",
    },
    {
      name: "Patient",
      icon: UserRound,
      path: "/dashboard/admin/patient",
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
      name: "Appointment",
      icon: Dock,
      path: "/dashboard/doctor/appointment",
    },
    {
      name: "Schedule",
      icon: NotepadText,
      path: "/dashboard/doctor/schedule",
    },
    {
      name: "Specialities",
      icon: PackagePlus,
      path: "/dashboard/doctor/specialities",
    },
    {
      name: "Blog",
      icon: Newspaper,
      path: "/dashboard/doctor/blog",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/doctor/settings",
    },
  ],
  PATIENT: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/patient",
    },
    {
      name: "Appointment",
      icon: Dock,
      path: "/dashboard/patient/appointment",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/patient/settings",
    },
  ],
};

export default function MenuList(role: string): MenuSubProps[] {
  return menuItem[role] || [];
}
