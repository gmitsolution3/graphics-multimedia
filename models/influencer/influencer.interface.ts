import { Document } from "mongoose";

export interface IInfluencerPricing {
  duration: string;
  price: number;
}

export interface IInfluencer extends Document {
  name: string;
  designation: string;
  bio: string;
  image: string;
  demoVideo: string;
  pricing: IInfluencerPricing[];
  createdAt: Date;
  updatedAt: Date;
}
