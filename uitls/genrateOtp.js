import otpGenerator from "otp-generator";

// Generate a 6-digit OTP
const GenrateOTP = () => {
    const otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets: false,
        digits: true // This ensures only numbers are included
    });
    return otp;
};

export default GenrateOTP;
