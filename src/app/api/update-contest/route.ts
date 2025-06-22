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
      return NextResponse.json({ success: false, message: "Failed to send contest details." }, { status: 500 });
    }
    await ContestModel.deleteMany();
    await ContestModel.insertMany(leetCode);
    await ContestModel.insertMany(codeChef);
    await ContestModel.insertMany(codeForces);
    return NextResponse.json({ success: true, message: "Contest updated successfully." }, { status: 200 });
  } catch (error) {
    console.error('Error updating contest:', error);
    return NextResponse.json({ success: false, message: "Failed to update contest." }, { status: 500 });
  }
}
//Add check functionlity for reminder and send mail for which remider is closer