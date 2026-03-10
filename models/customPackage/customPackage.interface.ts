import { Document } from "mongoose";

export interface ICustomPackageService {
  name: string;
  price: number;
  quantity: number;
  included: boolean;
}

export interface ICustomPackage extends Document {
  name: string;
  description: string;
  price: number;
  period: string;
  services: ICustomPackageService[];
  cta: string;
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
}
