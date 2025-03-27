import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json();
    const data = body;
    const {username,email,password} = data;
    
    if(!username || !email || !password){
        return NextResponse.json({message:"Enter valid details"},{
            status:400
        });
    }
    return NextResponse.json({message:"Login successful"});
}