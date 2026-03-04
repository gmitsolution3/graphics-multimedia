export interface IPackageService {
  name: string;
  included: boolean;
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
