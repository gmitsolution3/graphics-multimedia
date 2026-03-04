import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  FileText,
  Settings,
  Stethoscope,
  ClipboardList,
  MessageSquare,
  Bell,
  PieChart,
  UserCircle,
} from "lucide-react";

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Packages",
    url: "/admin-dashboard/packages",
    icon: FileSpreadsheet,
  },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Medical Records", url: "/records", icon: FileText },
  {
    title: "Prescriptions",
    url: "/prescriptions",
    icon: ClipboardList,
  },
];

export const managementItems = [
  { title: "Doctors", url: "/doctors", icon: Stethoscope },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Reports", url: "/reports", icon: PieChart },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

export const settingsItems = [
  { title: "Profile", url: "/profile", icon: UserCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];
