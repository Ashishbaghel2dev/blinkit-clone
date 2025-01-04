import express from "express";
import { 
    ForgetPassword,
  
    submitotp,
  
    UserLogin, 
    UserRegister, 
    verificationEmail 
} from "../controller/user.controller.js";
import { Auth } from "../middleware/auht.js";


const userRoute = express.Router();

// Define routes
userRoute.post("/register", UserRegister);
userRoute.post("/login", UserLogin);
userRoute.post("/verify-email", Auth,verificationEmail);
userRoute.post("/forrget-password", Auth,ForgetPassword);
userRoute.get("/submit-otp", Auth,submitotp);
export default userRoute;
