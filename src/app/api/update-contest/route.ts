"use server";
import { NextResponse } from 'next/server';
import { getCodechef } from '@/helpers/getCodechef';
import { getCodeforces } from '@/helpers/getCodeforces';
import { getLeetcode } from '@/helpers/getLeetcode';
import { Contest } from '@/model/Contest';
import ContestModel from '@/model/Contest';
import dbConnect from '@/lib/dbConnect';
interface result {
  leetCode: Contest[];
  codeChef: Contest[];
  codeForces: Contest[];
}
export async function GET() {
  try {
    await dbConnect();
    const [leetCode, codeChef, codeForces]: [Contest[], Contest[], Contest[]] = await Promise.all([
      getLeetcode(),
      getCodechef(),
      getCodeforces(),
    ]);
    console.log('Fetched contests:', { leetCode, codeChef, codeForces });
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
