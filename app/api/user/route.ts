import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";

export async function GET() {
  const client = await getClientPromise();
  const db = client.db("wad-01");

  const users = await db
    .collection("user")
    .find({}, { projection: { password: 0 } }) // ไม่ส่ง password
    .toArray();

  return NextResponse.json(users);
}
