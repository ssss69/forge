import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { goals, habits } from "@/db/schema";
import { ensureDemoUser } from "@/lib/backend/bootstrap";
import { demoUserId, jsonError } from "@/lib/backend/http";

export async function GET() {
  try {
    const db = getDb();
    await ensureDemoUser(db);

    const [goal] = await db
      .select()
      .from(goals)
      .where(eq(goals.userId, demoUserId))
      .orderBy(desc(goals.createdAt))
      .limit(1);
    const habitRows = await db
      .select()
      .from(habits)
      .where(eq(habits.userId, demoUserId))
      .orderBy(desc(habits.createdAt))
      .limit(6);

    return Response.json({
      goal: goal ?? { title: "Build disciplined deep work", category: "growth" },
      missions: habitRows.map((habit) => ({
        id: habit.id,
        title: habit.title,
        rewardXp: habit.rewardXp,
        rewardCoins: habit.rewardCoins,
      })),
      nextTask: habitRows[0]?.title ?? "Start a 45 minute focus sprint",
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load plan", 500);
  }
}
