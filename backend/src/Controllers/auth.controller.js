import config from "../config/config.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already exists",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    return res.status(201).json({
      message: "User Registerd successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

////////////////login api

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        message: "User not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password and email",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        message:"Login successful",
       
       
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error" ,
    });
  }
};

///////logout

export const LogoutUser = async(req,res)=>{
    try{
          res.clearCookie("token");
          return res.status(200).json({
            message:"Logout successfull",
          })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}



/////////Authorization

export const getAuthenticatedUser = (req,res)=>{
    res.status(200).json({
        message:"Authorized user",
        user:req.user,
    })
}
