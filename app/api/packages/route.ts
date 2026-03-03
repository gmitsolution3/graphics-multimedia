import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/package/package.model";

//? GET ALL PACKAGES
export async function GET() {
  try {
    await connectDB();

    const packages = await Package.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch packages" },
      { status: 500 },
    );
  }
}

//? CREATE NEW PACKAGE 
export async function POST(req: Request) {
  try {
    await connectDB();

    const payload = await req.json();

    //* Basic manual validation
    if (!payload.name || !payload.price || !payload.period || !payload.cta) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(payload.services)) {
      return NextResponse.json(
        { success: false, message: "Services must be an array" },
        { status: 400 },
      );
    }

    const newPackage = await Package.create(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Package created successfully",
        data: newPackage,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 400 },
    );
  }
}
