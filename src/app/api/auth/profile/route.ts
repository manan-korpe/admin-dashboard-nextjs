import dbConnection from "@/lib/dbConnection";
import users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
dbConnection();


//get all users details and also get totalnumber of user
export async function GET(request:NextRequest) {
    try{    
        const user = await users.find();
    
    if(!user){
        return NextResponse.json({message:"user not found"},{
            status:400
        });
    }

    const totalUsers =user.reduce((val,data)=>{
        return val+=1;
    },0);

    
    return NextResponse.json({message:"users founded",totalUsers,data:user});    
    }catch(error:any){
        return NextResponse.json({message:"something want wrong",error:error.message},{
            status:500
        });
    }
}

export async function PUT(request:NextRequest){
   try {
    const data = await request.json();
    const userid = new URL(request.url).searchParams.get("userid");

    if(!userid){
        return NextResponse.json({message:"user not found"},{
            status:400
        });
    }

    const user = await users.findById(userid);
    if(!user){
        return NextResponse.json({message:"user not found"},{
            status:400
        });
    }

    if(user.username == data?.username && user.email == data?.email && user.password == data?.password){
        return NextResponse.json({message:"profile details is same as old details"});
    }
    
    const updatedUser = await users.findByIdAndUpdate(userid,{username:data?.username || user.username,email:data?.email || user.email,password:data?.password || user.password},{new:true});
    
    if(!updatedUser){
        return NextResponse.json({message:"profile not updated"},{
            status:400
        });
    }

    return NextResponse.json({message:"profile updated successfuly",data:updatedUser});
   } catch (error:any) {
    return NextResponse.json({message:"something want wrong",error:error.message},{
        status:500
    });
   }
}