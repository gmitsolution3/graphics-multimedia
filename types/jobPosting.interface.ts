export interface ISalaryRange {
  min: number;
  max: number;
  period: "month" | "year";
}

export interface IJobPosting {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship";
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
  isActive: boolean;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IJobApplication {
  _id: string;
  name: string;
  email: string;
  address: string;
  resumeLink: string;
  expectedSalary: number;
  jobId: IJobPosting;
  jobTitle: string;
  createdAt: string;
  updatedAt: string;
}
