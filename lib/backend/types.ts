export type Track = "student" | "professional";

export interface OnboardingAnswers {
  age?: number;
  occupation?: string;
  track?: Track;
  primaryGoal?: string;
  exam?: string;
  workoutGoals?: string;
  sleepSchedule?: string;
  screenTimeHours?: number;
  biggestDistractions?: string[];
  workingStyle?: string;
  favoriteMusic?: string;
  preferredFocusMinutes?: number;
}

export interface GeneratedPlan {
  mainGoal: string;
  dailyRoutine: string[];
  focusSchedule: Array<{ label: string; minutes: number; purpose: string }>;
  habitPlan: Array<{ title: string; cadence: string; rewardXp: number; rewardCoins: number }>;
  blockingRules: Array<{ appName: string; coinCost: number; unlockRule: string }>;
  rewards: string[];
  milestones: string[];
}

export interface FocusSessionInput {
  plannedMinutes: number;
  strictMode?: boolean;
}

export interface EconomyProfile {
  level: number;
  xp: number;
  coins: number;
  title: string;
  stats: Record<string, number>;
}
