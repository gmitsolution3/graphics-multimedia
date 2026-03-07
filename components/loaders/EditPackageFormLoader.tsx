"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EditPackageLoader() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with back button skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />{" "}
          {/* Back button */}
          <div className="h-9 w-48 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-96 bg-gray-200 rounded ml-12" />
      </div>

      <div className="space-y-8">
        {/* Basic Information Card */}
        <Card className="animate-pulse">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded" />{" "}
              {/* Icon placeholder */}
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-96 bg-gray-200 rounded" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grid layout with alternating widths for visual interest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-3 w-36 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-3 w-44 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Description area with different height */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-32 w-full bg-gray-200 rounded" />
              <div className="h-3 w-56 bg-gray-200 rounded" />
            </div>

            {/* Toggle with shimmer effect */}
            <div className="relative overflow-hidden border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="h-4 w-4 bg-gray-200 rounded mt-1" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                  </div>
                  <div className="h-3 w-64 bg-gray-200 rounded" />
                </div>
              </div>
              {/* Shimmer overlay */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </CardContent>
        </Card>

        {/* Services Card with search/filter skeleton */}
        <Card className="animate-pulse">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-72 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-48 bg-gray-200 rounded" />{" "}
                {/* Search input */}
                <div className="h-6 w-24 bg-gray-200 rounded-full" />{" "}
                {/* Counter badge */}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Service items with staggered animation */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center space-x-3 p-4 border rounded-lg"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="h-4 w-4 bg-gray-200 rounded" />
                  <div className="flex-1">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-6 w-24 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions with right alignment */}
        <div className="flex justify-end space-x-4 animate-pulse">
          <div className="h-10 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>

      {/* Add CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
