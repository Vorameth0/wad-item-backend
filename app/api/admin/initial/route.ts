import { ensureIndexes } from "@/lib/ensureIndexes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("ENV ADMIN_SETUP_PASS =", process.env.ADMIN_SETUP_PASS);

  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get("pass");

  console.log("QUERY pass =", challenge);

  if (!challenge) {
    return NextResponse.json(
      { message: "Invalid usage" },
      { status: 400 }
    );
  }

  if (challenge !== process.env.ADMIN_SETUP_PASS) {
    return NextResponse.json(
      { message: "Admin password incorrect" },
      { status: 400 }
    );
  }

  await ensureIndexes();
  return NextResponse.json({ message: "Indexes ensured" });
}
