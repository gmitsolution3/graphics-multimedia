import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, phone, image } = await req.json();

  const db = client.db();
  const users = db.collection("user");

  await users.updateOne(
    { _id: new ObjectId(session.user.id) },
    {
      $set: {
        name,
        phone,
        image,
      },
    }
  );

  return NextResponse.json({ success: true });
}