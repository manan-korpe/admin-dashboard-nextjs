import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest) {
    try {
        console.log("wokring");
        return NextResponse.next();
    } catch (error:any) {
        return NextResponse.json({message:"Something want wrong",error:error.message});
    }
}

export const config = {
    matcher:[
        "/product",
        "/category"
    ]
}