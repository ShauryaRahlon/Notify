'use server'
import nodemailer from 'nodemailer';
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { Contest } from '@/model/Contest';
import * as React from 'react';
import ContestEmail from '../../emails/ContestEmail';

interface MailOptions {
    from: string | undefined;
    to: string[];
    subject: string;
    html: string;
}
export async function sendContestDetails(contestDetails: Contest[]): Promise<ApiResponse> {
    try {
        await dbConnect();
        const users = await UserModel.find({ acceptingContest: true });
        const emails = users.map((user) => user.email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        for (const contest of contestDetails) {
            const htmlcontent = await render(React.createElement(ContestEmail, { ...contest }));
            const mailOptions: MailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: emails,
                subject: 'Contest Update',
                html: htmlcontent
            };
            try {
                await transporter.sendMail(mailOptions);
            } catch (err) {
                console.error(`❌ Failed to send mail for contest "${contest.name}":`, err);
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