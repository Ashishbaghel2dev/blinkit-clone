import emailTemplate from "../config/emailTemplate.js";
import verifyEmail from "../config/VerifyEmail.js";
import userModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import GenrateOTP from "../uitls/genrateOtp.js";
import ForgetPasswordTemplate from "../config/ForgetEmail.js";
// usser register

export const UserRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, Email, or Password is missing",
      succes: false,
      error: true,
    });
  }

  try {
    const ExistUser = await userModel.findOne({ email });
    if (ExistUser) {
      return res.status(401).json({
        message: "User already exists, please login",
        succes: false,
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10); // Corrected method
    const hashPassword = await bcryptjs.hash(password, salt); // Await added

    const NewUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    verifyEmail(
      email,
      "Verify Email From Blinkit Clone",
      emailTemplate(
        NewUser.name,
        `http://localhost:4500/verify-email?code=${NewUser._id}`
      )
    );

    return res.status(201).json({
      message: "User created successfully",
      succes: true,
      data: NewUser,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      succes: false,
      error: true,
    });
  }
};

// verify email

export const verificationEmail = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Verification code is missing",
        status: false,
        error: true,
      });
    }

    const user = await userModel.findById(code);
    if (!user) {
      return res.status(404).json({
        message: "Invalid or expired verification code",
        status: false,
        error: true,
      });
    }

    if (user.verify_email) {
      return res.status(400).json({
        message: "Email is already verified",
        status: false,
        error: true,
      });
    }

    user.verify_email = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      status: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
      error: true,
    });
  }
};

//  user login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or Password is missing",
        success: false,
        error: true,
      });
    }

    // Find the user by email
    const ExistUser = await userModel.findOne({ email });
    if (!ExistUser) {
      return res.status(401).json({
        message: "User Not Found, please Signup Now",
        success: false,
        error: true,
      });
    }

    // Compare the entered password with the hashed password in the database
    const ComparePassword = await bcryptjs.compare(password, ExistUser.password);
    if (!ComparePassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
        success: false,
        error: true,
      });
    }

    // Generate a new refresh token
    const refresh_token = jsonwebtoken.sign(
      { userid: ExistUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    // Update the user's refresh token in the database
    ExistUser.refresh_token = refresh_token; // Ensure `refresh_token` is part of the user schema
    await ExistUser.save(); // Save the updated user data

    // Set the refresh token in a secure cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "None", // Adjust according to your client-server setup
    };
    res.cookie("refresh_token", refresh_token, cookieOptions);

    return res.status(200).json({
      message: "User has been logged in successfully",
      success: true,
      error: false,
      data: {
        refresh_token,
        username: ExistUser.name,
        useremail: ExistUser.email,
      },
    });
  } catch (error) {
    console.error("Error in UserLogin:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export const ForgetPassword = async (req, res) => {
  try {
    const userId = req.userId?.userid; 

    if (!userId) {
      return res.status(400).json({
        message: "User ID not provided",
        success: false,
        error: true,
      });
    }

    // Find user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Generate OTP
    const otp = GenrateOTP(); // Ensure GenerateOTP is defined and imported

    // Send OTP to user's email
    try {
      await verifyEmail(user.email, "Forget Password OTP", ForgetPasswordTemplate(user.name, otp));
    } catch (emailError) {
      return res.status(500).json({
        message: "Failed to send OTP",
        success: false,
        error: true,
      });
    }

    // Update user with OTP
    await userModel.findByIdAndUpdate(userId, { forgot_password_otp: otp });

    return res.status(200).json({
      message: "OTP sent successfully",
      success: true,
      error: false,
    });

  } catch (error) {
    console.error("Error in ForgetPassword:", error); // For debugging; ensure to remove in production
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: true,
    });
  }
};


export const submitotp = (req, res)=>{
  
try {
  
  
} catch (error) {
  console.error("Error in ForgetPassword:", error); // For debugging; ensure to remove in production
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: true,
    });
}

}