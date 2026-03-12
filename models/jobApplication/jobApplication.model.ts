import mongoose, { Schema, Model } from "mongoose";
import { IJobApplication } from "./jobApplication.interface";

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    resumeLink: {
      type: String,
      required: true,
    },

    expectedSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    jobId: {
      type: Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>(
    "JobApplication",
    JobApplicationSchema,
  );

export default JobApplication;
