// Alternative API approach
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      body: JSON.stringify({
        query: `
          {
            allContests {
              title
              titleSlug
              startTime
            }
          }
        `
      })
    });

    const data = await response.json();
    const contests = data?.data?.allContests
      .filter((c: any) => c.startTime > Date.now() / 1000)
      .map((c: any) => ({
        title: c.title,
        link: `https://leetcode.com/contest/${c.titleSlug}`,
        startTime: new Date(c.startTime * 1000).toISOString()
      }));

    return NextResponse.json(contests || []);
  } catch (error: any) {
    console.error('API request failed:', error.message);
    return NextResponse.json([], { status: 500 });
  }
}