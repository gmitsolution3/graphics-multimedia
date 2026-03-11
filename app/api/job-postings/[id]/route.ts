import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import JobPosting from "@/models/jobPosting/jobPosting.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const job = await JobPosting.findById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job posting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch job posting" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const job = await JobPosting.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job posting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job posting updated successfully.",
      data: job,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update job posting" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const job = await JobPosting.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job posting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job posting deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete job posting" },
      { status: 500 },
    );
  }
}
