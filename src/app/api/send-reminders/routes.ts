import { sendReminders } from "@/helpers/sendReminders";
import dbConnect from "@/lib/dbConnect";
import ReminderModel from "@/model/Reminder";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const reminders = await ReminderModel.find();
        if (reminders.length > 0) {
            const twoHourFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
            const tosend = reminders.filter((reminder) => {
                const reminderTime = new Date(reminder.contest.startTime);
                return reminderTime > twoHourFromNow;
            })
            const res = await sendReminders(tosend);
            if (res.success) {
                const idstoDelete = tosend.map((reminder) => reminder._id);
                await ReminderModel.deleteMany({ _id: { $in: idstoDelete } });
            }
        }
        return new Response(JSON.stringify({ success: true, message: "Reminders processed successfully." }), { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return new Response(JSON.stringify({ success: false, message: "Failed to process request." }), { status: 500 });
    }
}