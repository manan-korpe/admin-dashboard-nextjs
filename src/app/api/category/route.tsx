import dbConnection from "@/lib/dbConnection";
import categorys from "@/models/caregory";
import { NextRequest, NextResponse } from "next/server";

interface categoryInterface{
    name:String,
}

dbConnection();

export async function POST(request:NextRequest){
    try {
        const data:categoryInterface = await request.json();

        if(!data.name){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }

        const tempCategory = new categorys(data);
        const newCategory = await tempCategory.save();
        if(!newCategory){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }

        return NextResponse.json({message:"category added successfuly",data:newCategory});
        
    } catch (error:any) {
        return NextResponse.json({message:"something want wrong",error:error.message},{
            status:500
        })
    }
}

export async function GET(request:NextRequest){
    try {
        const category = await categorys.find();

        if(!category){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }

        const totalCategory = category.reduce((sum,_)=>{
            return sum+=1;
        },0);

        return NextResponse.json({message:"category goted",totalCategory,data:category});
        
    } catch (error:any) {
        return NextResponse.json({message:"something want wrong",error:error.message},{
            status:500
        })
    }
}