// components/loaders/InfluencersTableLoader.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function InfluencerTableLoader() {
  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <Card className="overflow-hidden border shadow-sm p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="bg-muted/50 grid grid-cols-7 gap-4 px-6 py-3">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-7 gap-4 px-6 py-5 border-b last:border-0"
              >
                {[...Array(7)].map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-6 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}