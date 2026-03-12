import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import JobApplication from "@/models/jobApplication/jobApplication.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const application = await JobApplication.create(body);

    return NextResponse.json(
      {
        success: true,
        data: application,
        message: "Application posted.",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job application",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const applications =
      await JobApplication.find().populate("jobId");

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch job applications",
      },
      { status: 500 },
    );
  }
}
