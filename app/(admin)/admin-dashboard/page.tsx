import StatsCard from "@/components/StatsCard";
import QuickActions from "@/components/QuickActions";
import BookingList from "@/components/BookingList";
import UserList from "@/components/UserList";

import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  Plus,
  FileText,
  Video,
  ClipboardList,
} from "lucide-react";

const quickactions = [
  {
    icon: Plus,
    label: "New Package",
    color: "bg-primary/20 hover:bg-primary/30 text-primary",
  },
  {
    icon: Plus,
    label: "New Service",
    color:
      "bg-[hsl(var(--success))]/10 hover:bg-[hsl(var(--success))]/30 text-[hsl(var(--success))]",
  },
  {
    icon: FileText,
    label: "View Bookings",
    color:
      "bg-[hsl(var(--info))]/10 hover:bg-[hsl(var(--info))]/30 text-[hsl(var(--info))]",
  },
  {
    icon: ClipboardList,
    label: "View Packages",
    color:
      "bg-[hsl(var(--warning))]/10 hover:bg-[hsl(var(--warning))]/30 text-[hsl(var(--warning))]",
  },
];

const bookings = [
  {
    id: 1,
    patient: "Michael Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    time: "09:00 AM",
    type: "Check-up",
    status: "confirmed",
    mode: "in-person",
  },
  {
    id: 2,
    patient: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    time: "10:30 AM",
    type: "Follow-up",
    status: "confirmed",
    mode: "video",
  },
  {
    id: 3,
    patient: "Robert Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    time: "11:15 AM",
    type: "Consultation",
    status: "pending",
    mode: "in-person",
  },
  {
    id: 4,
    patient: "Sarah Williams",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    time: "02:00 PM",
    type: "Check-up",
    status: "confirmed",
    mode: "video",
  },
  {
    id: 5,
    patient: "David Brown",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    time: "03:30 PM",
    type: "Emergency",
    status: "urgent",
    mode: "in-person",
  },
];

export default function AdminDashboardPage() {
  return (
    <section>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
            Welcome back, Dr. Wilson
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your practice today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Patients"
            value="1,284"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatsCard
            title="Appointments Today"
            value="18"
            change="5 pending confirmation"
            changeType="neutral"
            icon={Calendar}
            iconColor="text-[hsl(var(--success))]"
            iconBgColor="bg-[hsl(var(--success))]/10"
          />
          <StatsCard
            title="Active Cases"
            value="42"
            change="-3 from last week"
            changeType="negative"
            icon={Activity}
            iconColor="text-[hsl(var(--warning))]"
            iconBgColor="bg-[hsl(var(--warning))]/10"
          />
          <StatsCard
            title="Revenue"
            value="$24,580"
            change="+8.2% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-[hsl(var(--info))]"
            iconBgColor="bg-[hsl(var(--info))]/10"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions quickactions={quickactions} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BookingList bookings={bookings} />
          <UserList />
        </div>
      </div>
    </section>
  );
}
