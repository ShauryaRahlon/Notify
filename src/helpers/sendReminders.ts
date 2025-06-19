'use server'
import nodemailer from 'nodemailer';
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';
import * as React from 'react';
import { Reminder } from '@/model/Reminder';
import ReminderEmail from '../../emails/ReminderEmail';

interface MailOptions {
    from: string | undefined;
    to: string[];
    subject: string;
    html: string;
}
export async function sendReminders(tosend: Reminder[]): Promise<ApiResponse> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        for (const reminder of tosend) {
            const htmlcontent = await render(React.createElement(ReminderEmail, { ...reminder.contest }));
            const mailOptions: MailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: reminder.emails,
                subject: 'Contest Update',
                html: htmlcontent
            };
            try {
                await transporter.sendMail(mailOptions);
            } catch (err) {
                console.error(`❌ Failed to send mail for contest "${reminder.contest.name}":`, err);
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