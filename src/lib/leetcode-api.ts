import type { LeetCodeContestRating, LeetCodeBadges } from "./types"

// Mock API functions - replace with actual API calls
export async function   getLeetCodeContestRating(username: string): Promise<LeetCodeContestRating> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response - replace with actual API call
  return {
    status: "success",
    message: "retrieved",
    attendedContestsCount: 15,
    rating: 1650,
    globalRanking: 3500,
    totalParticipants: 120000,
    topPercentage: 2.92,
    badge: {
      name: "Guardian",
    },
    contestHistory: [
      {
        attended: true,
        rating: 1650,
        ranking: 850,
        trendDirection: "UP",
        problemsSolved: 4,
        totalProblems: 4,
        finishTimeInSeconds: 5400,
        contest: {
          title: "Weekly Contest 378",
          startTime: 1703433600,
        },
      },
      {
        attended: true,
        rating: 1580,
        ranking: 1200,
        trendDirection: "UP",
        problemsSolved: 3,
        totalProblems: 4,
        finishTimeInSeconds: 4800,
        contest: {
          title: "Biweekly Contest 119",
          startTime: 1703260800,
        },
      },
      {
        attended: true,
        rating: 1520,
        ranking: 1500,
        trendDirection: "UP",
        problemsSolved: 2,
        totalProblems: 4,
        finishTimeInSeconds: 3600,
        contest: {
          title: "Weekly Contest 377",
          startTime: 1702828800,
        },
      },
    ],
  }
}

export async function getLeetCodeBadges(username: string): Promise<LeetCodeBadges> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock response - replace with actual API call
  return {
    status: "success",
    message: "retrieved",
    badges: [
      {
        id: "1",
        name: "guardian",
        displayName: "Guardian",
        icon: "🛡️",
        creationDate: "2023-12-01",
        category: "Contest",
      },
      {
        id: "2",
        name: "knight",
        displayName: "Knight",
        icon: "⚔️",
        creationDate: "2023-11-15",
        category: "Contest",
      },
      {
        id: "3",
        name: "50-days-badge",
        displayName: "50 Days Badge",
        icon: "🔥",
        creationDate: "2023-10-20",
        category: "Study Plan",
      },
      {
        id: "4",
        name: "annual-badge-2023",
        displayName: "Annual Badge 2023",
        icon: "🏆",
        creationDate: "2023-12-31",
        category: "Annual",
      },
      {
        id: "5",
        name: "100-problems",
        displayName: "100 Problems Solved",
        icon: "💯",
        creationDate: "2023-09-10",
        category: "Achievement",
      },
    ],
    totalBadges: 5,
  }
}
