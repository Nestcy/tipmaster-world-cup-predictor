export type MatchStatus = 'upcoming' | 'live' | 'final';

export type PredictionCategory = 'exact' | 'outcome' | 'incorrect';

export interface Match {
  id: string;
  competition: string;
  stage: string;
  homeTeam: string;
  homeFlag: string;
  homeCode: string;
  awayTeam: string;
  awayFlag: string;
  awayCode: string;
  kickoffTime: string;
  stadium: string;
  status: MatchStatus;
  actualHomeScore?: number;
  actualAwayScore?: number;
  communityStats: {
    totalPredictions: number;
    homeWinPct: number;
    drawPct: number;
    awayWinPct: number;
  };
}

export interface UserPrediction {
  userId: string;
  userName: string;
  userAvatar?: string;
  matchId: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  submittedAt: string;
  resultCategory?: PredictionCategory;
  pointsAwarded?: number;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  points: number;
  predictionsCount: number;
  exactScoresCount: number;
  correctOutcomesCount: number;
  incorrectCount: number;
  accuracyPct: number;
  rank: number;
  previousRank?: number;
  isCurrentUser?: boolean;
}

export interface SettlementSummary {
  matchId: string;
  matchTitle: string;
  finalScore: string;
  totalEvaluated: number;
  exactCount: number;
  outcomeCount: number;
  incorrectCount: number;
  totalPointsAwarded: number;
  userResultCategory: PredictionCategory;
  userPointsEarned: number;
  settledAt: string;
  playerResults: UserPrediction[];
}

export interface PastResult {
  id: string;
  match: string;
  homeFlag: string;
  awayFlag: string;
  score: string;
  stage: string;
  exactPredictions: number;
  correctOutcomes: number;
  incorrectPredictions: number;
  userPoints?: number;
  userCategory?: PredictionCategory;
}
