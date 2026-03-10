import { IPackage, ICustomPackage } from "@/types";

export interface IBooking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
  selectedPackage: IPackage | ICustomPackage;
  packageModel: "Package" | "CustomPackage"; 
  bookingType: "standard" | "custom";
  createdAt: string;
  updatedAt: string;
}
