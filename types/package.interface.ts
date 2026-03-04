export interface IPackageService {
  name: string;
  included: boolean;
}

export interface IService {
  _id: string;
  name: string;
  createdAt: string;
}
export interface IPackage {
  _id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  services: Array<IPackageService>;
  cta: string;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
}
