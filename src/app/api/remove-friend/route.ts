import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const { username, f_platform } = await request.json();
        const user = await UserModel.findById(session?.user?._id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
        }
        if (!user.friends) {
            user.friends = [];
        }
        user.friends = user.friends.filter(friend => friend.username !== username && friend.f_platform !== f_platform);
        await user.save();
        return NextResponse.json({ success: true, message: "Friend removed successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error removing friend:", error);
        return NextResponse.json({ success: false, message: "Failed to remove friend." }, { status: 500 });
    }
}