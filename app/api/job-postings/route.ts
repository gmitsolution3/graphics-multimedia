import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import JobPosting from "@/models/jobPosting/jobPosting.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const job = await JobPosting.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Job posting created successfully.",
        data: job,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job posting",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const jobPostings = await JobPosting.find({}).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: jobPostings,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch job postings",
      },
      { status: 500 },
    );
  }
}
