import express from "express";
import userModel from "../models/user";
const router = express.Router()
router.post('/register',async(req,res)=>{
    const{username,email,password,role} = req.body;

    const user = await userModel.create({
        
    })
})








export default router ;