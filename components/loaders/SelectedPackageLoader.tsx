export default function SelectedPackageLoader() {
  return (
    <div>
      <div className="sticky top-24">
        <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-6 text-center">
          Selected package
        </h3>

        <div className="space-y-4 text-center">
          <div className="w-full max-w-md mx-auto inline-block bg-card p-8 lg:p-10 relative group border-primary/20 border-l border-r overflow-hidden">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            {/* Skeleton Popular tag */}
            <div className="absolute top-0 right-0">
              <div className="relative overflow-hidden w-20 h-20">
                <div className="absolute top-4 right-4 w-12 h-px bg-border/60 rotate-45 origin-top-right"></div>
                <span className="absolute top-8 right-4 text-[8px] tracking-[0.2em] uppercase text-border/60 rotate-45 origin-top-right">
                  Popular
                </span>
              </div>
            </div>

            {/* Skeleton Header */}
            <div className="mb-8">
              {/* Package name skeleton with pulse */}
              <div className="h-3 bg-border/40 rounded w-24 mx-auto mb-3 animate-pulse"></div>

              {/* Description skeleton with staggered animation */}
              <div className="space-y-2 mb-6">
                <div className="h-2 bg-border/40 rounded w-40 mx-auto animate-pulse"></div>
                <div className="h-2 bg-border/40 rounded w-36 mx-auto animate-pulse delay-75"></div>
              </div>

              {/* Price skeleton */}
              <div className="flex items-end justify-center gap-1">
                <div className="h-8 w-24 bg-border/40 rounded animate-pulse"></div>
                <div className="h-3 w-14 bg-border/40 rounded mb-1 animate-pulse delay-150"></div>
              </div>
            </div>

            {/* Skeleton Services list with staggered animation */}
            <div className="space-y-4 mb-8">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-start gap-3 max-w-[200px] mx-auto"
                >
                  <div
                    className="w-4 h-4 bg-border/40 rounded-sm animate-pulse flex-shrink-0"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  ></div>
                  <div
                    className="h-3 bg-border/40 rounded w-32 animate-pulse"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Skeleton accent line */}
            <div className="w-8 h-px bg-border/40 mt-6 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton Note */}
        <div className="flex justify-center mt-6">
          <div className="h-2 bg-border/40 rounded w-56 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

const styles = `
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;
