import jwt from 'jsonwebtoken';
import config from '../config/config.js'


export const isAuthenticated = (req,res,next)=>{
    try{

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Please login first"
            })
        }

        const decoded = jwt.verify(token,config.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(err){
        return res.status(401).json({
            message:"Invalid or expired token",
        })
    }
}