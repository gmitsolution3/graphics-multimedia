"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Regular Bookings",
      href: "/admin-dashboard/bookings/regular",
    },
    {
      name: "Custom Bookings",
      href: "/admin-dashboard/bookings/custom",
    },
  ];

  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Manage all customer bookings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Button
              key={tab.href}
              asChild
              variant={active ? "default" : "outline"}
            >
              <Link href={tab.href}>{tab.name}</Link>
            </Button>
          );
        })}
      </div>

      {/* Outlet */}
      {children}
    </section>
  );
}
