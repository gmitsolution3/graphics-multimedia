import { Document } from "mongoose";

export interface IService extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
