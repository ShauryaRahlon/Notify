export interface LeetcodeResponse {
  activeBadge: string | null;
  badges: Array<any>;
  contributions: {
    points: number;
    questionCount: number;
    testcaseCount: number;
  };
  githubUrl: string | null;
  linkedinUrl: string | null;
  message: string;
  profile: {
    aboutMe: string;
    birthday: string | null;
    company: string | null;
    countryName: string | null;
    ranking: number;
    realName: string;
    reputation: number;
    school: string | null;
    skillTags: string[];
    starRating: number;
    userAvatar: string;
    websites: string[];
  };
  recentSubmissions: Array<{
    lang: string;
    statusDisplay: string;
    timestamp: string;
    title: string;
    titleSlug: string;
  }>;
  status: string;
  submissionCalendar: Record<string, any>;
  submitStats: {
    acSubmissionNum: Array<{
      count: number;
      difficulty: string;
      submissions: number;
    }>;
    totalSubmissionNum: Array<{
      count: number;
      difficulty: string;
      submissions: number;
    }>;
  };
  twitterUrl: string | null;
  upcomingBadges: Array<{
    icon: string;
    name: string;
  }>;
  username: string;
}