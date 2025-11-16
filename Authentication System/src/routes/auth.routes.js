import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter  from "../email.js";
import crypto from "crypto";

const router = express.Router()
router.post('/register',async(req,res)=>{
    const{username,email,password,role} = req.body;
     const hassedPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,email,password:hassedPassword,role
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
    const isPasswordValid = await bcrypt.compare(password,isUserExists.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({id:isUserExists._id},process.env.JWT_SECRET);

    res.cookie("token",token,{
        expires:new Date(Date.now()+ 1000*60*60*24*7),
    })
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
router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({
        message:"user logged out successfully"
    })
})

router.post('/forget-password',async(req,res)=>{
    const{email} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"NO user find with this email "
        });
    }
  const token = crypto.randomBytes(32).toString('hex');
     user.resetPasswordToken = token ;
     user.resetPasswordExpires = Date.now()+15*60*1000;
     await user.save();
     const resetLink = `http://localhost:4000/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Your password reset link (valid for 15 minutes):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    };
     await transporter.sendMail(mailOptions);

    res.json({ message: "Reset link sent to email" });
})

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Save new password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined; 
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router ;