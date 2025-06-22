'use server'
import dbConnect from "@/lib/dbConnect"
import ReminderModel from "@/model/Reminder";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
       
        const reminders = await ReminderModel.find({
            userId: session.user._id
        })
        return NextResponse.json({ success: true, message: reminders }, { status: 200 });
    } catch (error) {
        console.error('Error fetching contests:', error);
        return NextResponse.json({ success: false, message: "Failed to fetch reminders." }, { status: 500 });
    }
}