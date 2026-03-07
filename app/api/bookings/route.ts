import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/booking/booking.model";

//? CREATE NEW BOOKING
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Service Booked succesfully.",
        data: booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
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

    const bookings = await Booking.find()
      .populate("selectedPlan")
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
