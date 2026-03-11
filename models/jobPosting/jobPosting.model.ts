import mongoose, { Schema, Model } from "mongoose";
import { IJobPosting } from "./jobPosting.interface";

const SalaryRangeSchema = new Schema(
  {
    min: {
      type: Number,
      required: true,
      min: 0,
    },
    max: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "BDT",
    },
    period: {
      type: String,
      enum: ["month", "year"],
      default: "month",
    },
  },
  { _id: false },
);

const JobPostingSchema = new Schema<IJobPosting>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },

    workplaceType: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    },

    experienceRequired: {
      type: String,
      required: true,
    },

    salaryRange: {
      type: SalaryRangeSchema,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    openings: {
      type: Number,
      required: true,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

const JobPosting: Model<IJobPosting> =
  mongoose.models.JobPosting ||
  mongoose.model<IJobPosting>("JobPosting", JobPostingSchema);

export default JobPosting;
