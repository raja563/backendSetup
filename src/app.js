import express from "express";
const app=express();
import cors from "cors"
// import cookieParser from "cookies-parser"
app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));
// app.use(cookieParser());



//routes
import userRouter from "./routes/user.routes.js"

// routes declaration 
app.use("/api/v1/users",userRouter);

export {app};