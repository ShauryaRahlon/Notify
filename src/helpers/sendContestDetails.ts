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
        console.log("📧 Sending contest details...");
        await dbConnect();
        const usersLeetCode = await UserModel.find({ LeetCode: true, emailNotifications: true });
        const usersCodeForces = await UserModel.find({ CodeForces: true, emailNotifications: true });
        const usersCodeChef = await UserModel.find({ CodeChef: true, emailNotifications: true });
        const emails_leetcode = usersLeetCode.map(user => user.email);
        const emails_codeforces = usersCodeForces.map(user => user.email);
        const emails_codechef = usersCodeChef.map(user => user.email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        for (const contest of contestDetails) {
            const emails: string[] = [];
            if (contest.platform === 'LeetCode') {
                emails.push(...emails_leetcode);
            } else if (contest.platform === 'CodeForces') {
                emails.push(...emails_codeforces);
            } else if (contest.platform === 'CodeChef') {
                emails.push(...emails_codechef);
            }
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