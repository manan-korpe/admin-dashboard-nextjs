import mongoose from "mongoose";

interface productInterface{
    name:String,
    image:String,
    category:String,
    price:String,
};

const productSchema = new mongoose.Schema<productInterface>({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"categorys",
        default:null
    },
    price:{
        type:Number,
        default:0
    }
},{ timestamps:true});


const products = mongoose.models.products || mongoose.model<productInterface>("products",productSchema);
export default products;