import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import InfluencerBooking from "@/models/influencerBooking/influencerBooking.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const booking =
      await InfluencerBooking.findById(id).populate("influencer");

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch booking" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const booking = await InfluencerBooking.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update booking" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await InfluencerBooking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete booking" },
      { status: 500 },
    );
  }
}
