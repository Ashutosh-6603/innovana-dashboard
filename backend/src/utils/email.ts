import nodemailer from "nodemailer";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendOTPEmail = async (
  toEmail: string,
  otp: string,
): Promise<void> => {
  await transporter.sendMail({
    from: `"Employee Dashboard" <${env.SMTP_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 8px; color: #4F46E5;">${otp}</h1>
        <p>This code expires in ${env.OTP_EXPIRES_IN_MINUTES} minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};
