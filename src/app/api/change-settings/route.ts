import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return new Response(
        JSON.stringify({ success: false, message: "Not authenticated" }),
        { status: 401 }
      );
    }
    const body = await req.json();
    const User = await UserModel.findOne({ _id: session.user._id });
    if (!User)
      return new Response(JSON.stringify({ success: false }), { status: 400 });

    // Update user settings from body
    if (body.platformPreferences) {
      User.LeetCode = body.platformPreferences.leetcode;
      User.CodeForces = body.platformPreferences.codeforces;
      User.CodeChef = body.platformPreferences.codechef;
    }
    if (body.notifications) {
      User.emailNotifications = body.notifications.email;
      User.browserNotifications = body.notifications.browser;
      User.pushNotifications = body.notifications.push;
    }
    await User.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating settings:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return new Response(
        JSON.stringify({ success: false, message: "Not authenticated" }),
        { status: 401 }
      );
    }
    const User = await UserModel.findOne({ _id: session.user._id });
    if (!User)
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    return new Response(
      JSON.stringify({
        success: true,
        platformPreferences: {
          leetcode: User.LeetCode,
          codeforces: User.CodeForces,
          codechef: User.CodeChef,
        },
        notifications: {
          email: User.emailNotifications,
          browser: User.browserNotifications,
          push: User.pushNotifications,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching settings:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
