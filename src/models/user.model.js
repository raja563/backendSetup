import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema=new Schema(
    {

       username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true,
        },
       email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avtar:{
            type:String,//cloudinary url
            required:true,
           
        },
        coverImage:{
            type:String,//cloudinary url

        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video",
            },
        ],
        password:{
            type:String,
            required:[true,'password is required ']
        },
        refreshToken:{
            type:String,
        } 
    },{timestamps:true}// for createed app and updated app 
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()

    this.password=bcrypt.hash(this.password,10)
    next()
})

// it is a custom method like insertOne 
userSchema.methods.isPasswordCurrect=async function(password){
      return await bcrypt.compare(password,this.password)
}


// jwt 
userSchema.methods.generateAccessToken=async function (){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=async function (){

    return jwt.sign(
        {
            _id:this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema);