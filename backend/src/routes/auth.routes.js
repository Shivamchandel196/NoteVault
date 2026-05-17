import express from "express";

import { registerUser,LoginUser,LogoutUser , getAuthenticatedUser } from "../Controllers/auth.controller.js";
import {isAuthenticated} from '../middleware/auth.middlware.js'

const router = express.Router();






router.get("/test", (req, res) => {
  res.status(200).json({
    message: "testing route",
  });
});

// api/auth/register
router.post('/register',registerUser)



//api/auth/login
router.post('/login',LoginUser)


///api/auth/logout
router.post('/logout',LogoutUser)

//api/auth/me
router.get('/me',isAuthenticated,getAuthenticatedUser)







export default router;