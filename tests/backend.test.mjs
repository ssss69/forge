import assert from "node:assert/strict";
import test from "node:test";

const planningUrl = new URL("../lib/backend/planning.ts", import.meta.url);
const scoringUrl = new URL("../lib/backend/scoring.ts", import.meta.url);

test("generates a personalized student plan", async () => {
  const { generatePlan } = await import(planningUrl.href);
  const plan = generatePlan({
    track: "student",
    exam: "JEE Advanced",
    primaryGoal: "Master physics",
    workoutGoals: "strength training",
    preferredFocusMinutes: 90,
    biggestDistractions: ["Instagram"],
  });

  assert.equal(plan.mainGoal, "Master physics");
  assert.equal(plan.focusSchedule[0].minutes, 90);
  assert.equal(plan.blockingRules[0].appName, "Instagram");
  assert.match(plan.dailyRoutine.join(" "), /strength training/);
});

test("economy profile levels up from XP", async () => {
  const { buildEconomyProfile, focusScore } = await import(scoringUrl.href);
  const profile = buildEconomyProfile(1840, 420);

  assert.ok(profile.level > 1);
  assert.equal(profile.title, "Apprentice");
  assert.equal(profile.coins, 420);
  assert.equal(focusScore(180, 2), 31);
});
