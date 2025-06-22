
export interface UserReminder {
  contestId: string
  reminderTime: number // minutes before contest
  isActive: boolean
}

export interface UserSettings {
  platformPreferences: {
    leetcode: boolean
    codeforces: boolean
    codechef: boolean
  }
  ,
  notifications: {
    email: boolean
    browser: boolean
    push: boolean
  }
}

export interface DashboardStats {
  totalUpcoming: number
  contestsToday: number
  activeReminders: number
  favoriteContests: number
}

// LeetCode Friend Stalking Types
export interface LeetCodeContestRating {
  status: string
  message: string
  attendedContestsCount: number
  rating: number
  globalRanking: number
  totalParticipants: number
  topPercentage: number
  badge: {
    name: string
  }
  contestHistory: ContestHistoryItem[]
}

export interface ContestHistoryItem {
  attended: boolean
  rating: number
  ranking: number
  trendDirection: "UP" | "DOWN" | "SAME"
  problemsSolved: number
  totalProblems: number
  finishTimeInSeconds: number
  contest: {
    title: string
    startTime: number
  }
}

export interface LeetCodeBadges {
  status: string
  message: string
  badges: Badge[]
  totalBadges: number
}

export interface Badge {
  id: string
  name: string
  displayName: string
  icon: string
  creationDate: string
  category: string
}
