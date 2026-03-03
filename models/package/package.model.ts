import mongoose, { Schema, Model } from "mongoose";
import { IPackage } from "./package.interface";

const PackageServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    included: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const PackageSchema = new Schema<IPackage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    period: {
      type: String,
      required: true,
    },
    services: {
      type: [PackageServiceSchema],
      required: true,
    },
    cta: {
      type: String,
      required: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

const Package: Model<IPackage> =
  mongoose.models.Package ||
  mongoose.model<IPackage>("PricingPlan", PackageSchema);

export default Package;
