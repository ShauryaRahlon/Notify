'use server'
import nodemailer from 'nodemailer';
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';

interface MailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    html: string;
}
export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        const htmlcontent = await render(VerificationEmail({ username, otp: verifyCode }));
        const mailOptions: MailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Contest Tracker Verification OTP',
            html: htmlcontent
        };
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: "Verification email sent successfully.",
        };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return {
            success: false,
            message: "Failed to send verification email.",
        };
    }
}