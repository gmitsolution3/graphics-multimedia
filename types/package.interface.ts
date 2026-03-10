export interface IPackageService {
  name: string;
  included: boolean;
}
export interface ICustomPackageService {
  name: string;
  price: number;
  quantity: number;
  included: boolean;
}

export interface IService {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
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

export interface ICustomPackage extends IPackage {
  services: ICustomPackageService[];
}
