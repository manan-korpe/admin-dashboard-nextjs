import dbConnection from "@/lib/dbConnection";
import users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    const username = rawBody.username.trim();
    const password = rawBody.password.trim();
    //check username and password is not null
    if (!username || !password) {
      return NextResponse.json(
        { message: "Enter valid details" },
        {
          status: 400,
        }
      );
    }

    const userFound = await users.findOne({
      username: username,
      password: password,
    });

    //check user found in database or not
    if (!userFound) {
      return NextResponse.json(
        { message: "user not Found" },
        {
          status: 400,
        }
      );
    }

    //create jwt token and strore it in client's browser
    const jwtToken = jwt.sign(
      { id: userFound._id },
      (process.env.JWT_SECRETE_KEY as any) || "admindashboard",
      { expiresIn: 24 * 60 * 60 * 1000 }
    );

    //cookie login start
    const cookie = await cookies();
    const cookieOption = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,  //Note :- not use expires use maxAge 
    };
  
    cookie.set("admin",jwtToken,cookieOption);
    //cookie logig end

    return NextResponse.json({
      message: "user login success",
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something want wrong", error: error.message },
      {
        status: 400,
      }
    );
  }
}
