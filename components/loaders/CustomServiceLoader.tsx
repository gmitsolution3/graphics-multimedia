
export const CustomServiceLoader = () => {
  return (
    <div className="p-4 border border-border/40 transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {/* Checkbox skeleton */}
            <div className="w-4 h-4 border border-border bg-muted/30 animate-pulse"></div>

            {/* Title skeleton */}
            <div className="h-4 w-32 bg-muted/30 rounded animate-pulse"></div>

            {/* Popular badge skeleton */}
            <div className="h-4 w-16 bg-muted/30 rounded animate-pulse"></div>
          </div>

          {/* Description skeleton */}
          <div className="pl-6 space-y-2">
            <div className="h-3 w-full max-w-[250px] bg-muted/30 rounded animate-pulse"></div>
            <div className="h-3 w-full max-w-[200px] bg-muted/30 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Price skeleton */}
        <div className="h-4 w-12 ml-4 bg-muted/30 rounded animate-pulse"></div>
      </div>

      {/* Accent line skeleton */}
      <div className="w-8 h-px mt-3 bg-muted/30 animate-pulse"></div>
    </div>
  );
};
