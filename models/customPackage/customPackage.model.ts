import mongoose, { Schema, Model } from "mongoose";
import { ICustomPackage } from "./customPackage.interface";

const CustomPackageServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    included: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const CustomPackageSchema = new Schema<ICustomPackage>(
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
      type: [CustomPackageServiceSchema],
      required: true,
    },
    cta: {
      type: String,
      default: "",
      required: false,
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

const CustomPackage: Model<ICustomPackage> =
  mongoose.models.CustomPackage ||
  mongoose.model<ICustomPackage>(
    "CustomPackage",
    CustomPackageSchema,
  );

export default CustomPackage;
