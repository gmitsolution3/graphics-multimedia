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
import JobDetailModal from '@/components/modals/JobDetailModal';

// Job type definition
interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  workplaceType: string;
  experienceLevel: string;
  experienceRequired: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicationDeadline: string;
  openings: number;
  postedAt: string;
  isActive: boolean;
  contactEmail: string;
}

// Sample job openings data
const jobOpenings: JobOpening[] = [
  {
    id: "job_001",
    title: "Frontend Developer",
    department: "Development",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    workplaceType: "Hybrid",
    experienceLevel: "Junior",
    experienceRequired: "1-2 years",
    salaryRange: {
      min: 30000,
      max: 50000,
      currency: "BDT",
      period: "month",
    },
    description:
      "We are looking for a passionate Frontend Developer to build modern web applications.",
    responsibilities: [
      "Develop responsive web interfaces",
      "Collaborate with backend developers",
      "Optimize performance",
    ],
    requirements: [
      "Strong knowledge of HTML, CSS, JavaScript",
      "Experience with React or Next.js",
      "Understanding of Git",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    benefits: [
      "Competitive salary",
      "Friendly work environment",
      "Career growth opportunities",
    ],
    applicationDeadline: "2026-04-15",
    openings: 2,
    postedAt: "2026-03-11",
    isActive: true,
    contactEmail: "careers@graphicsmultimedia.com",
  },
  {
    id: "job_002",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    employmentType: "Full-time",
    workplaceType: "Remote",
    experienceLevel: "Mid-Level",
    experienceRequired: "3-5 years",
    salaryRange: {
      min: 40000,
      max: 60000,
      currency: "BDT",
      period: "month",
    },
    description:
      "Seeking a creative UI/UX Designer to craft beautiful and intuitive user experiences.",
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research",
      "Design user interfaces",
    ],
    requirements: [
      "Proficiency in Figma",
      "Experience with user testing",
      "Portfolio of design work",
    ],
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    benefits: [
      "Flexible working hours",
      "Remote work setup",
      "Professional development",
    ],
    applicationDeadline: "2026-04-20",
    openings: 1,
    postedAt: "2026-03-10",
    isActive: true,
    contactEmail: "careers@graphicsmultimedia.com",
  },
  {
    id: "job_003",
    title: "Backend Developer",
    department: "Development",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    workplaceType: "On-site",
    experienceLevel: "Senior",
    experienceRequired: "5+ years",
    salaryRange: {
      min: 60000,
      max: 90000,
      currency: "BDT",
      period: "month",
    },
    description:
      "Looking for an experienced Backend Developer to build scalable server-side applications.",
    responsibilities: [
      "Design and implement APIs",
      "Database management",
      "System architecture",
    ],
    requirements: [
      "Experience with Node.js or Python",
      "Database expertise",
      "Cloud services knowledge",
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
    benefits: [
      "Higher salary range",
      "Leadership opportunities",
      "Annual bonus",
    ],
    applicationDeadline: "2026-04-10",
    openings: 1,
    postedAt: "2026-03-09",
    isActive: true,
    contactEmail: "careers@graphicsmultimedia.com",
  },
];

// Main Career Page
export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(
    null,
  );
  const [filterDepartment, setFilterDepartment] =
    useState<string>("All");

  const departments = [
    "All",
    ...new Set(jobOpenings.map((job) => job.department)),
  ];

  const filteredJobs =
    filterDepartment === "All"
      ? jobOpenings
      : jobOpenings.filter(
          (job) => job.department === filterDepartment,
        );

  const activeJobs = filteredJobs.filter((job) => job.isActive);

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
              {jobOpenings.length}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Open Positions
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              {new Set(jobOpenings.map((j) => j.department)).size}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Departments
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              {jobOpenings.reduce(
                (acc, job) => acc + job.openings,
                0,
              )}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase opacity-40">
              Total Hires
            </div>
            <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-primary/80 mb-2">
              Hybrid
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
            {departments.map((dept) => (
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
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {activeJobs.length > 0 ? (
            activeJobs.map((job) => (
              <div
                key={job.id}
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
                        {job.salaryRange.currency}{" "}
                        {job.salaryRange.min}k - {job.salaryRange.max}
                        k
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
