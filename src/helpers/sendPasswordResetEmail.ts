import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import ResetPassEmail from "../../emails/ResetPassEmail";

interface MailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}
export async function sendPasswordResetEmail(
  email: string,
  username: string,
  resetCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL, //fix this according to env
        pass: process.env.NODEMAILER_PASS, //this too
      },
    });

    const htmlcontent = await render(ResetPassEmail({ username, resetCode }));

    const mailOptions: MailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "🔐 Mystery Message Reset OTP",
      html: htmlcontent,
    };
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Reset email sent successfully",
    };
  } catch (error) {
    console.error("Failed to sent verification Email ", error);
    return {
      success: false,
      message: "Failed to send reset email",
    };
  }
}
