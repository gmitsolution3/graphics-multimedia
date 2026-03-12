"use client";

import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
  Award,
  GraduationCap,
  Heart,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import JobDetailModal from "@/components/modals/JobDetailModal";
import { IJobPosting } from "@/types";
import { useGetJobPostings } from "@/hooks/swr/useGetJobPostings";
import JobCardloader from "@/components/loaders/JobCardLoader";

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<IJobPosting | null>(
    null,
  );
  const [filterDepartment, setFilterDepartment] =
    useState<string>("All");

  const { data, isLoading } = useGetJobPostings();

  const jobPostings: IJobPosting[] = data?.data || [];

  const departments = [
    "All",
    ...new Set(jobPostings.map((job: IJobPosting) => job.department)),
  ];

  const filteredJobs =
    filterDepartment === "All"
      ? jobPostings
      : jobPostings.filter(
          (job: IJobPosting) => job.department === filterDepartment,
        );

  const activeJobs = filteredJobs.filter(
    (job: IJobPosting) => job.isActive,
  );

  // Calculate stats with loading state consideration
  const totalPositions = jobPostings.length;
  const totalDepartments = new Set(
    jobPostings.map((j: IJobPosting) => j.department),
  ).size;
  const totalHires = jobPostings.reduce(
    (acc: number, job: IJobPosting) => acc + job.openings,
    0,
  );

  return (
    <section className="py-20 lg:py-28 bg-card min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="flex justify-center mb-6">
            <Link href="/" className="inline-block mb-5 group">
              <div className="w-32 mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                <Image
                  src={Logo}
                  alt="Graphics Multimedia Logo"
                  width={120}
                  height={40}
                  className="w-full h-auto"
                />
              </div>
            </Link>
          </div>

          <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Join our team
          </h1>

          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            We're always looking for talented individuals who are
            passionate about creating exceptional digital experiences.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              {isLoading ? (
                <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              ) : (
                totalPositions
              )}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Open Positions
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              {isLoading ? (
                <div className="h-9 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              ) : (
                totalDepartments
              )}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Departments
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              {isLoading ? (
                <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              ) : (
                totalHires
              )}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Total Hires
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              {isLoading ? (
                <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              ) : (
                "Hybrid"
              )}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Work Mode
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs tracking-[0.2em] uppercase opacity-40 mr-2">
              Filter:
            </span>
            {isLoading ? (
              // Skeleton filters
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                  ></div>
                ))}
              </>
            ) : (
              departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilterDepartment(dept)}
                  className={`relative px-4 py-2 text-xs tracking-wider transition-colors ${
                    filterDepartment === dept
                      ? "text-primary"
                      : "opacity-40 hover:opacity-60"
                  }`}
                >
                  {dept}
                  {filterDepartment === dept && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-primary"></span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Jobs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {isLoading ? (
            // Show 5 skeleton cards while loading
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <JobCardloader key={i} />
              ))}
            </>
          ) : activeJobs.length > 0 ? (
            activeJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className="group border border-border/40 p-6 hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-light group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <span className="text-[10px] px-2 py-1 border border-primary/20 text-primary/60">
                        {job.workplaceType}
                      </span>
                    </div>

                    <p className="text-sm opacity-60 mb-3 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 opacity-40">
                        <Briefcase className="w-3 h-3" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 opacity-40">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 opacity-40">
                        <Clock className="w-3 h-3" />
                        {job.employmentType}
                      </span>
                      <span className="flex items-center gap-1 opacity-40">
                        <GraduationCap className="w-3 h-3" />
                        {job.experienceLevel}
                      </span>
                    </div>
                  </div>

                  {/* Salary & CTA */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                    <div className="text-right">
                      <p className="text-sm opacity-60">
                        BDT {job.salaryRange.min}k -{" "}
                        {job.salaryRange.max}k
                      </p>
                      <p className="text-xs opacity-30">
                        /{job.salaryRange.period}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-60 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="text-[10px] px-2 py-1 border border-border/40 opacity-40"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-[10px] px-2 py-1 opacity-30">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Accent line */}
                <div className="w-8 h-px bg-primary/30 mt-4 group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 border border-border/40">
              <p className="text-sm opacity-40">
                No open positions in this department
              </p>
            </div>
          )}
        </div>

        {/* Why Join Us Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-10">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
            <h3 className="text-xl lg:text-2xl font-light tracking-tight mb-4">
              Why join us?
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary/60" />
              </div>
              <h4 className="text-sm tracking-wide mb-2">
                Growth Mindset
              </h4>
              <p className="text-xs opacity-40">
                Continuous learning and professional development
                opportunities
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary/60" />
              </div>
              <h4 className="text-sm tracking-wide mb-2">
                Great Culture
              </h4>
              <p className="text-xs opacity-40">
                Collaborative, inclusive, and supportive work
                environment
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary/60" />
              </div>
              <h4 className="text-sm tracking-wide mb-2">
                Competitive Benefits
              </h4>
              <p className="text-xs opacity-40">
                Salary, flexibility, and opportunities for advancement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
      />
    </section>
  );
}
