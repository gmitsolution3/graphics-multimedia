import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Users,
  Mail,
  ChevronRight,
  X,
  GraduationCap,
  Heart,
} from "lucide-react";

import { IJobPosting } from "@/types";

export default function JobDetailModal({
  job,
  isOpen,
  onClose,
}: {
  job: IJobPosting | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !job) return null;

  const formatSalary = (
    min: number,
    max: number,
    currency: string,
    period: string,
  ) => {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}/${period}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-card border border-border/40 my-8">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/40 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase opacity-60 mb-1">
              {job.department}
            </h3>
            <h2 className="text-2xl font-light">{job.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 border border-border/40">
              <Briefcase className="w-4 h-4 opacity-40 mb-2" />
              <p className="text-xs opacity-40">Type</p>
              <p className="text-sm">{job.employmentType}</p>
            </div>
            <div className="p-4 border border-border/40">
              <MapPin className="w-4 h-4 opacity-40 mb-2" />
              <p className="text-xs opacity-40">Location</p>
              <p className="text-sm">{job.workplaceType}</p>
            </div>
            <div className="p-4 border border-border/40">
              <GraduationCap className="w-4 h-4 opacity-40 mb-2" />
              <p className="text-xs opacity-40">Experience</p>
              <p className="text-sm">{job.experienceRequired}</p>
            </div>
            <div className="p-4 border border-border/40">
              <DollarSign className="w-4 h-4 opacity-40 mb-2" />
              <p className="text-xs opacity-40">Salary</p>
              <p className="text-sm">
                {job.salaryRange.min}k - {job.salaryRange.max}k
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
              Description
            </h4>
            <p className="text-sm opacity-80 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
              Responsibilities
            </h4>
            <ul className="space-y-2">
              {job.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm opacity-70"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/60 mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
              Requirements
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm opacity-70"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/60 mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 border border-border/60 opacity-70 hover:opacity-100 hover:border-primary/30 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
              Benefits
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {job.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm opacity-70"
                >
                  <Heart className="w-3.5 h-3.5 text-primary/60" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
            <div>
              <p className="text-xs opacity-40 mb-1">Openings</p>
              <p className="text-sm flex items-center gap-2">
                <Users className="w-3.5 h-3.5 opacity-40" />
                {job.openings} position{job.openings > 1 ? "s" : ""}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-40 mb-1">Apply by</p>
              <p className="text-sm flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 opacity-40" />
                {new Date(
                  job.applicationDeadline,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border/40 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-xs opacity-40 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Send applications to: {job.contactEmail}
            </p>
            <Button
              onClick={() =>
                (window.location.href = `mailto:${job.contactEmail}`)
              }
              className="relative overflow-hidden group bg-transparent border border-primary/30 hover:border-primary text-foreground uppercase text-xs tracking-[0.2em] px-6 py-4 rounded-none transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply Now
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
