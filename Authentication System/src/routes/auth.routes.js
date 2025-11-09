import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router()
router.post('/register',async(req,res)=>{
    const{username,email,password,role} = req.body;

    const user = await userModel.create({
        username,email,password,role
    })
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered successfully",
        user
        
    })
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const isUserExists = await userModel.findOne({
        username:username
    })
    if(!isUserExists){
        return res.status(401).json({
            message:"user account not found"
        })
    }
    const isPasswordValid = password ==isUserExists.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    res.status(200).json({
        message:"user loggedIn Successfully"
    });
})

router.get('/users',async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }
    jwt.verify(token , process.env.JWT_SECRET)

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id:decoded.id 
        }).select("-password -v").lean()
        res.status(200).json({
            message:"user data fetched Successfully",
            user
        })

    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized- Invalid Token"
        })
    }
})









export default router ;