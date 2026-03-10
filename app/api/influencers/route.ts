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

export async function GET() {
  try {
    await connectDB();

    const influencers = await Influencer.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: influencers,
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
