import {
  LayoutDashboard,
  FileSpreadsheet,
  Settings,
  UserCircle,
  Box,
} from "lucide-react";

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    url: "/admin-dashboard/services",
    icon: Box,
  },
  {
    title: "Packages",
    url: "/admin-dashboard/packages",
    icon: FileSpreadsheet,
  },
];

export const settingsItems = [
  { title: "Profile", url: "/profile", icon: UserCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];
