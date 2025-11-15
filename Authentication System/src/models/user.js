import bcrypt from "bcrypt";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique: true,        // keep unique to prevent duplicate accounts (can also be sparse)
    lowercase: true,
    },
    password:{
        type:String,
        
    },
    role : {
        type:String,
        default:"user",
    },
    provider:{
        type:String,
        default:"google",
    },
    googleId:{
        type:String,
    
    },
    emailverified:{
        type:Boolean,
        default:false,
    },
},
    {timestamps:true},
);
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
const userModel = mongoose.model("User",userSchema);
export default userModel ;