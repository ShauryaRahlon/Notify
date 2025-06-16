import type { Contest, DashboardStats } from "./types"

export const mockContests: Contest[] = [
  {
    id: "1",
    title: "Weekly Contest 378",
    platform: "leetcode",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: 90,
    url: "https://leetcode.com/contest/weekly-contest-378",
    difficulty: "medium",
    description: "Weekly programming contest with 4 problems",
    participants: 15420,
  },
  {
    id: "2",
    title: "Codeforces Round #912 (Div. 2)",
    platform: "codeforces",
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    duration: 120,
    url: "https://codeforces.com/contest/1903",
    difficulty: "medium",
    description: "Competitive programming round for Div. 2 participants",
    participants: 8750,
  },
  {
    id: "3",
    title: "AtCoder Beginner Contest 332",
    platform: "atcoder",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    duration: 100,
    url: "https://atcoder.jp/contests/abc332",
    difficulty: "easy",
    description: "Beginner-friendly contest with 6 problems",
    participants: 12300,
  },
  {
    id: "4",
    title: "CodeChef Starters 112",
    platform: "codechef",
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    duration: 180,
    url: "https://codechef.com/START112",
    difficulty: "medium",
    description: "Weekly contest for all skill levels",
    participants: 5600,
  },
  {
    id: "5",
    title: "GeeksforGeeks Weekly Contest",
    platform: "gfg",
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration: 120,
    url: "https://practice.geeksforgeeks.org/contest",
    difficulty: "medium",
    description: "Practice contest with algorithmic problems",
    participants: 3200,
  },
  {
    id: "6",
    title: "LeetCode Biweekly Contest 119",
    platform: "leetcode",
    startTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    duration: 90,
    url: "https://leetcode.com/contest/biweekly-contest-119",
    difficulty: "hard",
    description: "Biweekly contest with challenging problems",
    participants: 18900,
  },
]

export const mockStats: DashboardStats = {
  totalUpcoming: 24,
  contestsToday: 3,
  activeReminders: 8,
  favoriteContests: 5,
}

export const platformColors = {
  leetcode: "bg-orange-500",
  codeforces: "bg-blue-500",
  atcoder: "bg-gray-700",
  codechef: "bg-amber-600",
  gfg: "bg-green-600",
}

export const platformNames = {
  leetcode: "LeetCode",
  codeforces: "Codeforces",
  atcoder: "AtCoder",
  codechef: "CodeChef",
  gfg: "GeeksforGeeks",
}
