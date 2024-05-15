import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const connectDB=async()=>{
    try {
       const connectionInstance= mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       console.log(" database connected !");
    } catch (error) {
        console.log("MONGODB connection error:",error);
        // process.exit(1);
    }
} 

export default connectDB;