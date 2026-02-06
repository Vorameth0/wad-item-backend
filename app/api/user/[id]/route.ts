import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const client = await getClientPromise();
  const db = client.db("wad-01");

  await db.collection("user").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  );

  return NextResponse.json({ message: "User updated" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await getClientPromise();
  const db = client.db("wad-01");

  await db.collection("user").deleteOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json({ message: "User deleted" });
}
