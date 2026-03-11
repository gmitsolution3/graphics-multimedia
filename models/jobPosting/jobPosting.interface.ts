import { Document } from "mongoose";

export interface ISalaryRange {
  min: number;
  max: number;
  period: "month" | "year";
}

export interface IJobPosting extends Document {
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workplaceType: "Onsite" | "Remote" | "Hybrid";
  experienceLevel: "Junior" | "Mid" | "Senior";
  experienceRequired: string;
  salaryRange: ISalaryRange;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicationDeadline: Date;
  openings: number;
  postedAt: Date;
  isActive: boolean;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}