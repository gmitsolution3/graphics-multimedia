import { IPackage } from "@/types";

export interface IBooking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
  selectedPackage: IPackage;
  createdAt: string;
  updatedAt: string;
}
