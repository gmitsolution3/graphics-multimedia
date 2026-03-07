import mongoose, { Schema, Model } from "mongoose";
import { IService } from "./service.interface";

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { strict: true, timestamps: true, versionKey: false },
);

const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);

export default Service;
