const ForgetPasswordTemplate = (name, otp) => {
    return `
      <h1>Dear ${name},</h1>
      <p>We received a request to reset your password. Please use the One-Time Password (OTP) below to proceed with resetting your password:</p>
      <h1 style="text-align:center; color: #2c3e50;">${otp}</h1>
      <p>This OTP is valid for the next 10 minutes. If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
      <p>Thank you,<br> The Support Team</p>
    `;
  };

  
  export default ForgetPasswordTemplate;