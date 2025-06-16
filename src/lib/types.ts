export interface Contest {
  id: string
  title: string
  platform: "leetcode" | "codeforces" | "gfg" | "atcoder" | "codechef"
  startTime: Date
  duration: number // in minutes
  url: string
  difficulty?: "easy" | "medium" | "hard"
  description?: string
  participants?: number
  prizes?: string
}

export interface UserReminder {
  contestId: string
  reminderTime: number // minutes before contest
  isActive: boolean
}

export interface UserSettings {
  emailPreferences: {
    oneHour: boolean
    oneDay: boolean
    oneWeek: boolean
  }
  platformPreferences: {
    leetcode: boolean
    codeforces: boolean
    gfg: boolean
    atcoder: boolean
    codechef: boolean
  }
  timezone: string
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
