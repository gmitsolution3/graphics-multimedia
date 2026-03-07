import mongoose, { Schema, Model } from "mongoose";
import { IBooking } from "./booking.interface";

const BookingSchema = new Schema<IBooking>(
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

    selectedPackage: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
