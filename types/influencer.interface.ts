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
