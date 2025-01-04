import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.VERIFY_EMAIL_API_KEY);

const verifyEmail = async (sendTo, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Blinkit Clone <onboarding@resend.dev>',
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err; // Re-throw the error for handling by the caller
  }
};

export default verifyEmail;
