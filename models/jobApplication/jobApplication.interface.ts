import { Document, Types } from "mongoose";

export interface IJobApplication extends Document {
  name: string;
  email: string;
  address: string;
  resumeLink: string;
  expectedSalary: number;
  jobId: Types.ObjectId;   
  jobTitle: string;
  createdAt: Date;
  updatedAt: Date;
}