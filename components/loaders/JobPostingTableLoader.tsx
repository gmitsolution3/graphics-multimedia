import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobPostingTableLoader() {
  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Table Skeleton */}
      <Card className="overflow-hidden border shadow-sm p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Header */}
            <div className="bg-muted/50 grid grid-cols-9 gap-4 px-4 py-3">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Rows */}
            {[...Array(5)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-9 gap-4 px-4 py-4 border-b last:border-0"
              >
                {[...Array(9)].map((_, colIndex) => (
                  <div key={colIndex} className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
