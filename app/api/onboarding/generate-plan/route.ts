import { getDb } from "@/db";
import { goals, habits, blockedApps } from "@/db/schema";
import { ensureDemoUser } from "@/lib/backend/bootstrap";
import { createId, demoUserId, jsonError, readJson } from "@/lib/backend/http";
import { generatePlan } from "@/lib/backend/planning";
import type { OnboardingAnswers } from "@/lib/backend/types";

export async function POST(request: Request) {
  try {
    const answers = await readJson<OnboardingAnswers>(request);
    const plan = generatePlan(answers);
    const db = getDb();

    await ensureDemoUser(db);

    const goalId = createId("goal");
    await db.insert(goals).values({
      id: goalId,
      userId: demoUserId,
      title: plan.mainGoal,
      category: answers.track === "professional" ? "career" : "study",
    });

    await db.insert(habits).values(
      plan.habitPlan.map((habit) => ({
        id: createId("habit"),
        userId: demoUserId,
        goalId,
        title: habit.title,
        cadenceJson: JSON.stringify({ cadence: habit.cadence }),
        rewardXp: habit.rewardXp,
        rewardCoins: habit.rewardCoins,
      })),
    );

    await db.insert(blockedApps).values(
      plan.blockingRules.map((rule) => ({
        id: createId("app"),
        userId: demoUserId,
        appName: rule.appName,
        coinCost: rule.coinCost,
        unlockRuleJson: JSON.stringify({ description: rule.unlockRule }),
      })),
    );

    return Response.json({ plan }, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to generate plan", 500);
  }
}
