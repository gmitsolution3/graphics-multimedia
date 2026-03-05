"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PackageTableLoader() {
  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Table Skeleton */}
      <Card className="overflow-hidden border shadow-sm p-0">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="border-b bg-muted/50">
            <div className="flex px-6 py-4">
              <Skeleton className="h-4 w-24 mr-4" />{" "}
              {/* Name header */}
              <Skeleton className="h-4 w-24 mr-4" />{" "}
              {/* Created header */}
              <Skeleton className="h-4 w-20" /> {/* Action header */}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-5 animate-pulse"
              >
                {/* Name column */}
                <div className="flex-1">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Created column */}
                <div className="flex-1">
                  <Skeleton className="h-5 w-28 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Action column */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Loading indicator row */}
          <div className="flex items-center justify-center gap-2 py-4 border-t bg-muted/20">
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
          </div>
        </div>
      </Card>
    </section>
  );
}
