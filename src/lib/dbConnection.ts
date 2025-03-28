import mongoose from "mongoose";
import GlobalError from "next/dist/client/components/error-boundary";

const mognooseUrl = process.env.MONGOOSE_URL;
if(!mognooseUrl){
    throw new Error("database url not found");
}

const cached = (global as any).mognoose || {conn:null,promise:null};;


export default async function dbConnection(){
    try{
        if(cached.conn){
            return cached.conn;
        }

        if(!cached.promise){
            cached.promise = mongoose.connect(mognooseUrl!,{
                dbName:"admin-dashboard"
            }).then((mong)=>mong);

        }
        cached.conn = await cached.promise;
        return cached.conn;
    }catch(error:any){
        console.error(error.message);
        // process.exit(1);
        return error;
    }
}