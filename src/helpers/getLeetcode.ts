import axios from 'axios';
import { Contest } from '@/model/Contest';
// Define contest interface matching your schema


async function getLeetcode(): Promise<Contest[]> {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query {
          allContests {
            title
            titleSlug
            startTime
            duration
          }
        }
      `
    });

    const currentTime = Math.floor(Date.now() / 1000);
    const contests = response.data.data.allContests
      .filter((contest: any) => contest.startTime > currentTime)
      .map((contest: any) => {
        const startTime = new Date(contest.startTime * 1000);
        const endTime = new Date((contest.startTime + contest.duration) * 1000);
        
        return {
          code: contest.titleSlug,  // Using slug as unique code
          platform: 'LeetCode',
          name: contest.title,
          startTime,
          endTime,
          duration: contest.duration,
          url: `https://leetcode.com/contest/${contest.titleSlug}/`
        };
      });

    return contests;
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    return [];
  }
}

export { getLeetcode };

// Example usage
