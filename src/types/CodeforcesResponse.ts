export interface CodeforcesRatingHistory {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface CodeforcesResponse {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  country: string | null;
  city: string | null;
  organization: string | null;
  contribution: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  titlePhoto: string;
  avatar: string;
  contests_count: number;
  solved_problems_count: number;
  rating_history: CodeforcesRatingHistory[];
}