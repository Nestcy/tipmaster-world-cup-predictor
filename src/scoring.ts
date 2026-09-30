import { PredictionCategory } from './types.ts';

export interface ScoreEvaluationResult {
  category: PredictionCategory;
  points: number;
  label: string;
}

/**
 * Pure scoring function to evaluate a prediction against actual match scores.
 * 
 * Rules:
 * - Exact Score: +5 points
 * - Correct Outcome (Win/Draw/Loss): +2 points
 * - Incorrect Prediction: 0 points
 */
export function evaluatePrediction(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): ScoreEvaluationResult {
  // 1. Check exact score
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return {
      category: 'exact',
      points: 5,
      label: 'Exact Score',
    };
  }

  // 2. Check outcome direction
  const actualOutcome = Math.sign(actualHome - actualAway);
  const predictedOutcome = Math.sign(predictedHome - predictedAway);

  if (actualOutcome === predictedOutcome) {
    return {
      category: 'outcome',
      points: 2,
      label: 'Correct Outcome',
    };
  }

  // 3. Incorrect
  return {
    category: 'incorrect',
    points: 0,
    label: 'Incorrect',
  };
}

/**
 * Calculates updated accuracy percentage for a player.
 */
export function calculateAccuracy(
  correctOutcomesTotal: number,
  totalPredictions: number
): number {
  if (totalPredictions === 0) return 0;
  return Math.round((correctOutcomesTotal / totalPredictions) * 100);
}
