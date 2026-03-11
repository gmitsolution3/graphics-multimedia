import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Influencer from "@/models/influencer/influencer.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const influencer = await Influencer.findById(id);

    if (!influencer) {
      return NextResponse.json(
        { success: false, message: "Influencer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch influencer" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const influencer = await Influencer.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!influencer) {
      return NextResponse.json(
        { success: false, message: "Influencer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Influencer updated successfully.",
      data: influencer,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update influencer" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const influencer = await Influencer.findByIdAndDelete(id);

    if (!influencer) {
      return NextResponse.json(
        { success: false, message: "Influencer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Influencer deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete influencer" },
      { status: 500 },
    );
  }
}
