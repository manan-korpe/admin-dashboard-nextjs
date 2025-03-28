import dbConnection from "@/lib/dbConnection";
import users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

const db = await dbConnection();
export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Enter valid Details" },
        {
          status: 400,
        }
      );
    }

    const dbUser = new users({
      username: username,
      email: email,
      password: password,
      createAt: new Date(),
    });

    const savedUser = await dbUser.save();

    if (!savedUser) {
      return NextResponse.json(
        { message: "user not saved in database something want wrong" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({ message: "db Connected",data:savedUser});
  } catch (error: any) {
    console.error("error:", error.message);
    return NextResponse.json({ message: error.message });
  }
}
