import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, resetCode, newPassword } = await request.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    //verify reset code
    if (
      !user.resetCode ||
      user.resetCode != resetCode ||
      !user.resetCodeExpires ||
      new Date() > user.resetCodeExpires
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid or expired reset code",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    //hash new password and update user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;

    await user.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Password reset successful",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in reset password", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error in reset pass route",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
