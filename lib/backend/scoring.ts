import type { EconomyProfile } from "./types";

export function calculateLevel(xp: number) {
  return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 120)) + 1);
}

export function titleForLevel(level: number) {
  if (level >= 30) return "Mythic Builder";
  if (level >= 20) return "Flow Architect";
  if (level >= 10) return "Discipline Keeper";
  return "Apprentice";
}

export function buildEconomyProfile(xp: number, coins: number): EconomyProfile {
  const level = calculateLevel(xp);

  return {
    level,
    xp,
    coins,
    title: titleForLevel(level),
    stats: {
      discipline: Math.min(99, 48 + level * 2),
      knowledge: Math.min(99, 42 + Math.floor(xp / 180)),
      health: Math.min(99, 50 + Math.floor(coins / 120)),
      consistency: Math.min(99, 55 + level * 2),
      mindfulness: Math.min(99, 46 + Math.floor(level * 1.7)),
    },
  };
}

export function focusScore(completedMinutes: number, unlockAttempts: number) {
  const base = Math.min(100, Math.round(completedMinutes / 4));
  const penalty = Math.min(35, unlockAttempts * 7);
  return Math.max(0, base - penalty);
}
