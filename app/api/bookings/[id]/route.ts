import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/booking/booking.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

//? GET A SINGLE BOOKING
export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const booking =
      await Booking.findById(id).populate("selectedPlan");

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

//? DELETE A BOOKING
export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await Booking.findByIdAndDelete(id);

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
