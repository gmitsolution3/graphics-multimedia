import {
  LayoutDashboard,
  FileSpreadsheet,
  Settings,
  UserCircle,
  Box,
  BookCheck,
  Speech,
  FileStack
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
  {
    title: "Influencers",
    url: "/admin-dashboard/influencers",
    icon: Speech,
  },
  {
    title: "Bookings",
    url: "/admin-dashboard/bookings/regular",
    icon: BookCheck,
  },
  {
    title: "Job Posting",
    url: "/admin-dashboard/job-posting",
    icon: FileStack,
  },
];

export const settingsItems = [
  {
    title: "Profile",
    url: "/admin-dashboard/profile",
    icon: UserCircle,
  },
  { title: "Settings", url: "/settings", icon: Settings },
];
