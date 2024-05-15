// require('dotenv').config({path:'./.env'});
import connectDB from "./db/conn.js";
import express from "express";
const app=express();
import dotenv from "dotenv";

dotenv.config(
    {
        path:'./env'
    }
)
connectDB();

app.listen(process.env.HOST,()=>{
    console.log("server is staeted !");
})