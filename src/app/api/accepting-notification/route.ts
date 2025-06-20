import { getSession } from "next-auth/react";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth/next";

export async function POST() {
    try {
        await dbConnect();
        const session = await getServerSession();
        const User = await UserModel.findOne({ _id: session?.user._id });
        if (!User) return new Response(JSON.stringify({ success: false }), { status: 400 });
        User.acceptingContest = !User.acceptingContest;
        await User.save();
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error accepting notification:", error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession();
        const User = await UserModel.findOne({ _id: session?.user._id });
        if (!User) return new Response(JSON.stringify({ success: false }), { status: 400 });
        return new Response(JSON.stringify({ acceptingContest: User.acceptingContest }), { status: 200 });
    } catch (error) {
        console.error("Error fetching notification status:", error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}
