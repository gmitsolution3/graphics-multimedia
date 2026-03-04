import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Service from "@/models/service/service.model";

//? GET ALL SERVICE
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find(
      {},
      {
        updatedAt: 0,
      },
    ).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 },
    );
  }
}

//? CREATE NEW SERVICE
export async function POST(req: Request) {
  try {
    await connectDB();

    const payload = await req.json();

    if (!payload.name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 },
      );
    }

    const service = await Service.create({
      name: payload.name,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: service,
      },
      { status: 201 },
    );
  } catch (error: any) {
    //* Duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Service already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 400 },
    );
  }
}
