import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("wad-01");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("user").insertOne({
      username,
      password: hashedPassword,
      status: "ACTIVE",
    });

    return NextResponse.json(
      { id: result.insertedId },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      { message: "Duplicate username or server error" },
      { status: 400 }
    );
  }
}
