"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesTableLoader() {
  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Table */}
      <Card className="overflow-hidden border shadow-sm p-0">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="border-b bg-muted/50">
              <div className="grid grid-cols-3 px-6 py-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="grid grid-cols-3 px-6 py-5">
                  {/* Name Column */}
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>

                  {/* Created Column */}
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer loading state */}
            <div className="flex items-center justify-center gap-2 py-3 border-t bg-muted/5">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}