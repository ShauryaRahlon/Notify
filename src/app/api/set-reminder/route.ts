import { NextResponse } from "next/server";
import ReminderModel from "@/model/Reminder";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { Contest } from "@/model/Contest";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
export async function POST(request: Request) {
  dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { contest }: { contest: Contest } = await request.json();
    const existingReminder = await mongoose.model('Reminder').findOne({ 'contest.code': contest.code, userId: session.user._id }); // Adjust the model name and field as necessary
    if (!existingReminder) {
      const newReminder = new ReminderModel({ userId: session.user._id, contest });
      await newReminder.save();
      return NextResponse.json({ success: true, message: "Reminder set successfully." }, { status: 200 });
    }
    else {
      await ReminderModel.deleteOne({ _id: existingReminder._id });
      return NextResponse.json(
        { success: true, message: "Reminder removed successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error setting reminder:', error);
    return NextResponse.json({ success: false, message: "Failed to set reminder." }, { status: 500 });
  }
}
