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
        // Check if the friend already exists
        const friendExists = user.friends.some(friend => (friend.username === username || friend.username === username.toLowerCase()) && friend.f_platform === f_platform);
        if (friendExists) {
            return NextResponse.json({ success: true, message: "Friend already exists." }, { status: 200 });
        }
        return NextResponse.json({ success: true, message: "Friend does not exist." }, { status: 200 });
    } catch (error) {
        console.error("Error adding friend:", error);
        return NextResponse.json({ success: false, message: "Failed to add friend." }, { status: 500 });
    }
}