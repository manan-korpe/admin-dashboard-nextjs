import dbConnection from "@/lib/dbConnection";
import categorys from "@/models/caregory";
import products from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

interface productInterface{
    name:String,
    Image:String,
    category:String,
    price:String,
};

dbConnection();
export async function POST(request:NextRequest){
    try {
        const data:productInterface = await request.json();
        
        if(!data.name || !data.category || !data.price){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }
        
        //check category exists or not and add category object into data.category
        const category = await categorys.findOne({name:data.category});

        if(!category){
            return NextResponse.json({message:"category not found"},{
                status:400
            });
        }
        data.category = category;
        //end category 
        
        const tempProduct = new products({...data,price:Number(data.price)});
        const newProduct = await tempProduct.save();

        if(!newProduct){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }

        return NextResponse.json({message:"product added successfuly",data:newProduct});
        
    } catch (error:any) {
        return NextResponse.json({message:"something want wrong",error:error.message},{
            status:500
        })
    }
}

export async function GET(request:NextRequest){
    try {
        const product = await products.find();

        if(!product){
            return NextResponse.json({message:"Product not found"},{
                status:400
            });
        }
        const totalProduct = product.reduce((sum,_)=>{
            return sum+=1;
        },0);
        
        return NextResponse.json({message:"product added successfuly",totalProduct,data:product});
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message:"something want wrong",error:error.message},{
            status:500
        })
    }
}

export async function PUT(request:NextRequest){
    try {
        const data:productInterface = await request.json();
        
        if(!data.name || !data.category || !data.price){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }
        const id = new URL(request.url).searchParams.get("id");
        const existsProduct = await products.findById(id);
        
        if(!existsProduct){
            return NextResponse.json({message:"product not found"},{
                status:400
            });
        }
        
        //check category exists or not and add category object into data.category
        const category = await categorys.findOne({name:data.category});
        
        if(!category){
            return NextResponse.json({message:"category not found"},{
                status:400
            });
        }
        data.category = category;
        //end category 

        //check new details is not same as old details
        if(data.name == existsProduct.name && data.category._id.toString() == existsProduct.category._id.toString() && data.price == existsProduct.price){
            return NextResponse.json({message:"your update details is same is exists details"},{
                status:400
            });
        }
        
        const updatedProduct = await products.findByIdAndUpdate(id,data,{new:true});

        if(!updatedProduct){
            return NextResponse.json({message:"Enter valid details"},{
                status:400
            });
        }

        return NextResponse.json({message:"product added successfuly",data:updatedProduct});
        
    } catch (error:any) {
        return NextResponse.json({message:"something want wrong",error:error.message},{
            status:500
        })
    }
}