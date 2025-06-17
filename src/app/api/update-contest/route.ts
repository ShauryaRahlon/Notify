"use server";
import { NextResponse ,NextRequest} from 'next/server';
import {getCodechef} from '@/helpers/getCodechef';
import {getCodeforces} from '@/helpers/getCodeforces';
import {getLeetcode} from '@/helpers/getLeetcode';
import { Contest } from '@/model/Contest';
interface result {
  leetCode: Contest[];
  codeChef: Contest[];
  codeForces: Contest[];
}
export async function GET() {
  try {
    // Fetch contests from different platforms
    const [leetCode, codeChef, codeForces]: [Contest[], Contest[], Contest[]] = await Promise.all([
      getLeetcode(),
      getCodechef(),
      getCodeforces(),
    ]);
    console.log('Fetched contests:', { leetCode, codeChef, codeForces });

    return NextResponse.json({ message: { leetCode, codeChef, codeForces } }, { status: 200 });
  } catch (error) {
    console.error('Error updating contest:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
