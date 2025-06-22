"use server";
import { NextResponse } from 'next/server';
import { getCodechef } from '@/helpers/getCodechef';
import { getCodeforces } from '@/helpers/getCodeforces';
import { getLeetcode } from '@/helpers/getLeetcode';
import { Contest } from '@/model/Contest';
import ContestModel from '@/model/Contest';
import dbConnect from '@/lib/dbConnect';
import { sendContestDetails } from '@/helpers/sendContestDetails';
export async function GET() {
  try {
    setTimeout(async () => {
      await dbConnect();
      const [leetCode, codeChef, codeForces]: [Contest[], Contest[], Contest[]] = await Promise.all([
        getLeetcode(),
        getCodechef(),
        getCodeforces(),
      ]);
      const currentContest = await ContestModel.find();
      const allContest = [...leetCode, ...codeChef, ...codeForces];
      const existingSet = new Set(
        currentContest.map((contest) => `${contest.code}-${contest.platform}`)
      );
      const newContests = [];
      const sampleContest: Contest = {
        code: "LC123",
        platform: "LeetCode",
        name: "LeetCode Weekly Contest 401",
        startTime: new Date("2025-06-23T14:30:00.000Z"),
        endTime: new Date("2025-06-23T16:30:00.000Z"),
        duration: 120, // in minutes
        url: "https://leetcode.com/contest/weekly-contest-401/"
      };
      newContests.push(sampleContest);
      for (const contest of allContest) {
        const key = `${contest.code}-${contest.platform}`;
        if (!existingSet.has(key)) {
          newContests.push(contest);
        }
      }
      console.log('New contests:', newContests);
      if (newContests.length === 0) {
        return NextResponse.json({ success: true, message: "Contest already updated." }, { status: 200 });
      }
      const res = await sendContestDetails(newContests);
      if (!res.success) {
        console.error('Failed to send contest details:', res.message);
        return NextResponse.json({ success: false, message: "Failed to send contest details." }, { status: 500 });
      }
      await ContestModel.deleteMany();
      await ContestModel.insertMany(leetCode);
      await ContestModel.insertMany(codeChef);
      await ContestModel.insertMany(codeForces);
    }, 0);
    return NextResponse.json({ success: true, message: "Contest updated successfully." }, { status: 200 });
  } catch (error) {
    console.error('Error updating contest:', error);
    return NextResponse.json({ success: false, message: "Failed to update contest." }, { status: 500 });
  }
}
//Add check functionlity for reminder and send mail for which remider is closer