// require('dotenv').config({path:'./.env'});
import connectDB from "./db/conn.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path:'./env'
    }
)
connectDB().
then(()=>{
    app.listen(process.env.HOST||8000,()=>{
        console.log("server is staerted !!");
    })
}).
catch((error)=>{
    console.log("MONGO db connection failed :",error);
})

