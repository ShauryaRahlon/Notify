import { sendPasswordResetEmail } from "@/helpers/sendPasswordResetEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import Email from "next-auth/providers/email";
import { redirect } from "next/dist/server/api-utils";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email } = await request.json();
    const user = await UserModel.findOne({ email, isVerified: true });
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found or verified",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpires = new Date();
    resetCodeExpires.setHours(resetCodeExpires.getHours() + 1);

    //saving reset code to db
    user.resetCode = resetCode;
    user.resetCodeExpires = resetCodeExpires;
    await user.save();
    const emailRepsonse = await sendPasswordResetEmail(
      user.email,
      user.username,
      user.resetCode
    );

    if (!emailRepsonse.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "failed to send reset email",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Password reset instruction sent to ur email successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in forgot password", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error during password reset email",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
