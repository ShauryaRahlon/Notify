'use server'
import nodemailer from 'nodemailer';
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';
import * as React from 'react';
import ReminderModel, { Reminder } from '@/model/Reminder';
import ReminderEmail from '../../emails/ReminderEmail';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

interface MailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    html: string;
}
export async function sendRemindersOneHour(tosend: Reminder[]): Promise<ApiResponse> {
    try {
        await dbConnect();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        for (const reminder of tosend) {
            console.log(reminder);
            const user = await UserModel.findById(reminder.userId);
            if (!user) {
                console.error(`❌ User not found for reminder with ID: ${reminder._id}`);
                continue;
            }
            if (user.oneHourBefore) {
                const contest = reminder.contest;
                const htmlcontent = await render(React.createElement(ReminderEmail, { code: contest.code, name: contest.name, platform: contest.platform, startTime: contest.startTime, endTime: contest.endTime, duration: contest.duration, url: contest.url }));
                const mailOptions: MailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: user.email,
                    subject: 'Contest Update',
                    html: htmlcontent
                };
                try {
                    await transporter.sendMail(mailOptions);
                } catch (err) {
                    console.error(`❌ Failed to send mail for contest "${reminder.contest.name}":`, err);
                }
            }
        }
        return {
            success: true,
            message: "Contest details sent successfully.",
        }
    } catch (error) {
        console.error("Error sending contest details:", error);
        return {
            success: false,
            message: "Failed to send contest details.",
        };
    }
}
export async function sendRemindersOneDay(tosendOneDay: Reminder[]): Promise<ApiResponse> {
    try {
        await dbConnect();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        for (const reminder of tosendOneDay) {
            console.log(reminder);
            const user = await UserModel.findById(reminder.userId);
            if (!user) {
                console.error(`❌ User not found for reminder with ID: ${reminder._id}`);
                continue;
            }
            if (user.oneDayBefore) {
                const contest = reminder.contest;
                const htmlcontent = await render(React.createElement(ReminderEmail, { code: contest.code, name: contest.name, platform: contest.platform, startTime: contest.startTime, endTime: contest.endTime, duration: contest.duration, url: contest.url }));
                const mailOptions: MailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: user.email,
                    subject: 'Contest Update',
                    html: htmlcontent
                };
                try {
                    await transporter.sendMail(mailOptions);
                } catch (err) {
                    console.error(`❌ Failed to send mail for contest "${reminder.contest.name}":`, err);
                }
            }
        }
        return {
            success: true,
            message: "Contest details sent successfully.",
        }
    } catch (error) {
        console.error("Error sending contest details:", error);
        return {
            success: false,
            message: "Failed to send contest details.",
        };
    }
}
