import { Document, Types } from "mongoose";

export interface IInfluencerBooking extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectDetails: string;
  influencer: Types.ObjectId;
  duration: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
