import { eq } from "drizzle-orm";
import type { getDb } from "@/db";
import { blockedApps, economyEvents, profiles } from "@/db/schema";
import { createId, demoUserId } from "./http";

type Db = ReturnType<typeof getDb>;

export async function ensureDemoUser(db: Db) {
  const existing = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.id, demoUserId))
    .limit(1);

  if (existing.length) return;

  await db.insert(profiles).values({
    id: demoUserId,
    displayName: "Demo User",
    age: 21,
    occupation: "Student",
    track: "student",
    primaryGoal: "Build disciplined deep work",
  });

  await db.insert(blockedApps).values([
    {
      id: createId("app"),
      userId: demoUserId,
      appName: "Instagram",
      coinCost: 150,
      unlockRuleJson: JSON.stringify({ required: ["main_mission", "workout"] }),
    },
    {
      id: createId("app"),
      userId: demoUserId,
      appName: "TikTok",
      coinCost: 250,
      unlockRuleJson: JSON.stringify({ required: ["weekly_challenge"] }),
    },
    {
      id: createId("app"),
      userId: demoUserId,
      appName: "YouTube",
      coinCost: 80,
      unlockRuleJson: JSON.stringify({ required: ["learning_playlist"] }),
    },
  ]);

  await db.insert(economyEvents).values({
    id: createId("eco"),
    userId: demoUserId,
    sourceType: "starter_bonus",
    xpDelta: 1840,
    coinDelta: 420,
  });
}
