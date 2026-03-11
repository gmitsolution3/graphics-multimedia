import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import InfluencerBooking from "@/models/influencerBooking/influencerBooking.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await InfluencerBooking.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Influencer booked successfully.",
        data: booking,
      },
      { status: 201 },
    );
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

export async function GET() {
  try {
    await connectDB();

    const bookings = await InfluencerBooking.find()
      .populate("influencer")
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
