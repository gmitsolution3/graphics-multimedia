import mongoose, { Schema, Model } from "mongoose";
import { IInfluencerBooking } from "./influencerBooking.interface";

const InfluencerBookingSchema = new Schema<IInfluencerBooking>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    projectDetails: {
      type: String,
      required: true,
    },

    influencer: {
      type: Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

const InfluencerBooking: Model<IInfluencerBooking> =
  mongoose.models.InfluencerBooking ||
  mongoose.model<IInfluencerBooking>(
    "InfluencerBooking",
    InfluencerBookingSchema,
  );

export default InfluencerBooking;
