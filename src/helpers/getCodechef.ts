'use server'
import { Contest } from "@/model/Contest";

interface RawContest {
    contest_code: string;
    contest_name: string;
    contest_start_date: string;
    contest_end_date: string;
    contest_start_date_iso: string;
    contest_end_date_iso: string;
    contest_duration: string;
    distinct_users: number;
}
const getCodechef = async (): Promise<Contest[]> => {
    try {
        const response = await fetch(`https://www.codechef.com/api/list/contests/all?sort_by=END&sorting_order=desc&offset=0&mode=all`)
        const data = await response.json();
        const contestdata = data.future_contests;
        const formattedData: Contest[] = contestdata.map((contest: RawContest) => ({
            code: contest.contest_code,
            platform: 'CodeChef',
            name: contest.contest_name,
            startTime: new Date(contest.contest_start_date_iso),
            endTime: new Date(contest.contest_end_date_iso),
            duration: Number(contest.contest_duration),
            url: `https://www.codechef.com/${contest.contest_code}`
        }));
        return formattedData;
    } catch (error) {
        console.log(error)
        return [];
    }
}
export { getCodechef }