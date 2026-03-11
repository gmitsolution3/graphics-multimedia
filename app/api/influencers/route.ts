import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Influencer from "@/models/influencer/influencer.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const influencer = await Influencer.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Influencer created successfully.",
        data: influencer,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create influencer",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const [influencers, total] = await Promise.all([
      Influencer.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Influencer.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: influencers,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch influencers",
      },
      { status: 500 },
    );
  }
}
