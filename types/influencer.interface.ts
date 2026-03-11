export interface IInfluencerPricing {
  duration: string;
  price: number;
}

export interface IInfluencer {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  demoVideo: string;
  pricing: IInfluencerPricing[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookedInfluencer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
  influencer: IInfluencer;
  duration: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}