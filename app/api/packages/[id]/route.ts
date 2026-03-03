import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/package/package.model";
import mongoose from "mongoose";

//? GET SINGLE PACKAGE
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    const pkg = await Package.findById(id);

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch package" },
      { status: 500 },
    );
  }
}

//? UPDATE PACKAGE
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    const updated = await Package.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Package updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Update failed" },
      { status: 400 },
    );
  }
}

//? DELETE PACKAGE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    const deleted = await Package.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete package" },
      { status: 500 },
    );
  }
}
