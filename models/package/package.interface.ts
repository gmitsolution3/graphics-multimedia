import { Document } from "mongoose";

export interface IPackageService {
  name: string;
  included: boolean;
}

export interface IPackage extends Document {
  name: string;
  description: string;
  price: number;
  period: string;
  services: IPackageService[];
  cta: string;
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
}
