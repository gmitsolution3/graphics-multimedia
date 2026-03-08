import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectDetails: string;
  selectedPackage: Types.ObjectId;
  packageModel: string;
  bookingType: string;
  createdAt: Date;
  updatedAt: Date;
}
