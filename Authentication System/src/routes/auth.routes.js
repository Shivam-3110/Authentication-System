import express from "express";
import userModel from "../models/user.js";
const router = express.Router()
router.post('/register',async(req,res)=>{
    const{username,email,password,role} = req.body;

    const user = await userModel.create({
        username,email,password,role
    })
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









export default router ;