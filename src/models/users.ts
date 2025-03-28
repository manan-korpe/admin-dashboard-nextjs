import mongoose from "mongoose";

interface usersInterface{
    username:String,
    email:String,
    password:String,
    isAdmin:Boolean,
    createAt:Date
}
const userSchema = new mongoose.Schema<usersInterface>({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    createAt:Date
});

const users = mongoose.models.users || mongoose.model<usersInterface>("users",userSchema);

export default users;