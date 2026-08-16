import type { GeneratedPlan, OnboardingAnswers } from "./types";

const defaultDistractions = ["Instagram", "TikTok", "YouTube"];

export function generatePlan(answers: OnboardingAnswers): GeneratedPlan {
  const focusMinutes = clamp(answers.preferredFocusMinutes ?? 45, 25, 180);
  const isStudent = answers.track === "student";
  const goal =
    answers.primaryGoal?.trim() ||
    (isStudent ? `Prepare for ${answers.exam || "the next exam"}` : "Build a calmer deep work routine");
  const distractions = answers.biggestDistractions?.length
    ? answers.biggestDistractions
    : defaultDistractions;

  return {
    mainGoal: goal,
    dailyRoutine: [
      "Morning review and main quest selection",
      `${focusMinutes} minute deep work sprint`,
      answers.workoutGoals ? `Workout: ${answers.workoutGoals}` : "Movement block",
      "Evening shutdown and AI review",
    ],
    focusSchedule: [
      { label: "Prime block", minutes: focusMinutes, purpose: isStudent ? "Highest value study" : "Highest leverage work" },
      { label: "Recovery block", minutes: 25, purpose: "Admin, cleanup, and low-friction progress" },
      { label: "Final push", minutes: Math.min(focusMinutes, 60), purpose: "Complete the daily mission stack" },
    ],
    habitPlan: [
      { title: isStudent ? "Revision reps" : "Deep work reps", cadence: "daily", rewardXp: 80, rewardCoins: 50 },
      { title: "Workout or walk", cadence: "5x weekly", rewardXp: 120, rewardCoins: 70 },
      { title: "Sleep shutdown", cadence: answers.sleepSchedule || "nightly", rewardXp: 60, rewardCoins: 35 },
    ],
    blockingRules: distractions.slice(0, 5).map((appName, index) => ({
      appName,
      coinCost: [150, 250, 80, 120, 100][index] ?? 100,
      unlockRule: "Unlock only after today's main mission and recovery habit",
    })),
    rewards: ["Focus Coins", "XP", "Daily streak protection", "Rare badge after 90 minute flow"],
    milestones: ["7 day baseline", "21 day consistency arc", "First monthly quest", "Habit DNA report"],
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
