"use server";
import { Contest } from "@/model/Contest";

interface RawContest {
  id: number;
  name: string;
  phase: string;
  type: string;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
  durationSeconds: number;
  frozen: boolean;
}
const getCodeforces = async (): Promise<Contest[]> => {
  try {
    const response = await fetch(`https://codeforces.com/api/contest.list`);
    const data = await response.json();
    const contestdata = data.result.filter((contest: RawContest) => {
      return contest.phase === "BEFORE";
    });
    const formattedData: Contest[] = contestdata.map((contest: RawContest) => ({
      code: String(contest.id),
      platform: "CodeForces",
      name: contest.name,
      startTime: new Date(contest.startTimeSeconds * 1000),
      endTime: new Date(
        (contest.startTimeSeconds + contest.durationSeconds) * 1000
      ),
      duration: Number(contest.durationSeconds) / 60,
      url: `https://codeforces.com/contest/${contest.id}`,
    }));
    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getCodeforces };
