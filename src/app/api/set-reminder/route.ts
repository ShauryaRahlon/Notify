import { NextResponse } from "next/server";
import ReminderModel from "@/model/Reminder";// Adjust the import path as necessary
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { Contest } from "@/model/Contest";
import dbConnect from "@/lib/dbConnect"; // Adjust the import path as necessary
import { authOptions } from "../auth/[...nextauth]/options";
export async function POST(request: Request) {
  dbConnect();
  try {
    const session = await getServerSession(authOptions);

    // Check if session exists and user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { contest }: { contest: Contest } = await request.json();

    const existingReminder = await mongoose.model('Reminder').findOne({ 'contest.code': contest.code }); // Adjust the model name and field as necessary
    if (!existingReminder) {
      const newReminder = new ReminderModel({ userId: session.user._id, contest });
      await newReminder.save();
      return NextResponse.json({ success: true, message: "Reminder set successfully." }, { status: 200 });
    }
    if (existingReminder.userId === session.user._id) {
      return NextResponse.json({ success: false, message: "You have already set a reminder for this contest." }, { status: 400 });
    }
    existingReminder.userId = session.user._id;
    await existingReminder.save();

    return NextResponse.json({ success: true, message: "Reminder set successfully." }, { status: 200 });
  } catch (error) {
    console.error('Error setting reminder:', error);
    return NextResponse.json({ success: false, message: "Failed to set reminder." }, { status: 500 });
  }
}
