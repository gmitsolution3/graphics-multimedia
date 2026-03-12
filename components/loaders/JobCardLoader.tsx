import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const JobCardloader = () => {
  return (
    <div className="group border border-border/40 p-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Job Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {/* Title skeleton */}
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            {/* Workplace type skeleton */}
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Description skeleton - 2 lines */}
          <div className="space-y-2 mb-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Meta items skeleton */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-gray-200 dark:text-gray-700" />
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-200 dark:text-gray-700" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-200 dark:text-gray-700" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-gray-200 dark:text-gray-700" />
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Salary & CTA skeleton */}
        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
          <div className="text-right">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-200 dark:text-gray-700" />
        </div>
      </div>

      {/* Skills Preview skeleton */}
      <div className="flex flex-wrap gap-2 mt-4">
        {/* Skill chips */}
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Accent line skeleton */}
      <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mt-4"></div>
    </div>
  );
};

export default JobCardloader;
