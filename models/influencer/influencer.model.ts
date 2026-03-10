import mongoose, { Schema, Model } from "mongoose";
import { IInfluencer } from "./influencer.interface";

const InfluencerPricingSchema = new Schema(
  {
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const InfluencerSchema = new Schema<IInfluencer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    demoVideo: {
      type: String,
      required: true,
    },

    pricing: {
      type: [InfluencerPricingSchema],
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

const Influencer: Model<IInfluencer> =
  mongoose.models.Influencer ||
  mongoose.model<IInfluencer>("Influencer", InfluencerSchema);

export default Influencer;
