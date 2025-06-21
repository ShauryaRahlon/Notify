import { sendRemindersOneHour, sendRemindersOneDay } from "@/helpers/sendReminders";
import dbConnect from "@/lib/dbConnect";
import ReminderModel from "@/model/Reminder";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const reminders = await ReminderModel.find();
        if (reminders.length > 0) {
            const now = new Date();
            const thirtyMinFromNow = new Date(now.getTime() + 30 * 60 * 1000);
            const sixtyMinFromNow = new Date(now.getTime() + 60 * 60 * 1000);

            const tosend = reminders.filter((reminder) => {
                const reminderTime = new Date(reminder.contest.startTime);
                return reminderTime >= thirtyMinFromNow && reminderTime <= sixtyMinFromNow;
            });
            const res = await sendRemindersOneHour(tosend);
            if (res.success) {
                const idstoDelete = tosend.map((reminder) => reminder._id);
                await ReminderModel.deleteMany({ _id: { $in: idstoDelete } });
            }
            const twentyThreeHrThirtyMinFromNow = new Date(now.getTime() + (23 * 60 + 30) * 60 * 1000);
            const twentyFourHrFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const tosendOneDay = reminders.filter((reminder) => {
                const reminderTime = new Date(reminder.contest.startTime);
                return reminderTime >= twentyThreeHrThirtyMinFromNow && reminderTime <= twentyFourHrFromNow;
            });
            await sendRemindersOneDay(tosendOneDay);
        }
        return new NextResponse(JSON.stringify({ success: true, message: "Reminders processed successfully." }), { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return new NextResponse(JSON.stringify({ success: false, message: "Failed to process request." }), { status: 500 });
    }
}