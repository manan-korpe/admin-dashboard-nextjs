import mongoose from "mongoose";

interface categoryInterface{
    name:String,
}

const categorySchema = new mongoose.Schema<categoryInterface>({
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const categorys = mongoose.models.categorys || mongoose.model<categoryInterface>("categorys",categorySchema);
export default categorys;