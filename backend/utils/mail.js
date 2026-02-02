import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { forgotPasswordTemplate } from "./forgotPassword.js";
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async(email,otp)=>{
    await transporter.sendMail({
        from:`"Cravio" <${process.env.EMAIL}>`,
        to:email,
        subject:"Reset Your Password",
        html: forgotPasswordTemplate(email,otp)
    })
}