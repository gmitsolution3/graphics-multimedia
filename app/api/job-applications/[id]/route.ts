import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import JobApplication from "@/models/jobApplication/jobApplication.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const application =
      await JobApplication.findById(id).populate("jobId");

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const application = await JobApplication.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application post updated.",
      data: application,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update application" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const application = await JobApplication.findByIdAndDelete(id);

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete application" },
      { status: 500 },
    );
  }
}
