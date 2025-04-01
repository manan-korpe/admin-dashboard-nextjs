import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import users from "@/models/users";

export async function POST(request: NextRequest) {
  try {
    const adminCookie = request.cookies.get("admin");
    console.log(adminCookie);
    if (!adminCookie) {
      return NextResponse.json(
        { message: "admin not authonticated", error: true },
        {
          status: 400,
        }
      );
    }

    const {id} = jwt.verify(adminCookie.value,(process.env.JWT_SECRETE_KEY as any) || "admindashboard");

    const authenticatedUser =  await users.findById(id);
    if(!authenticatedUser){
        return NextResponse.json(
            { message: "admin not authonticated", error: true },
            {
              status: 400,
            }
          );
    }

    return NextResponse.json({ message: "user found",data:authenticatedUser});
  } catch (error: any) {
    return NextResponse.json(
      { message: "something want wrong", error: error.message },
      {
        status: 500,
      }
    );
  }
}
