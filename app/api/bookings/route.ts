import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/booking/booking.model";
import CustomPackage from "@/models/customPackage/customPackage.model";

//? CREATE NEW BOOKING
export async function POST(req: Request) {
  try {
    await connectDB();

    const payload = await req.json();

    if (payload.packageType === "custom") {
      const customPackageResponse = await CustomPackage.create(
        payload.selectedPackage,
      );

      payload.selectedPackage = customPackageResponse._id;

      const booking = await Booking.create(payload);

      return NextResponse.json(
        {
          success: true,
          message: "Service Booked succesfully.",
          data: booking,
        },
        { status: 201 },
      );
    } else {
      const booking = await Booking.create(payload);

      return NextResponse.json(
        {
          success: true,
          message: "Service Booked succesfully.",
          data: booking,
        },
        { status: 201 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 },
    );
  }
}

//? GET BOOKING LIST
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find({})
      .populate("selectedPackage")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      { status: 500 },
    );
  }
}
