import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { aiInsights } from "@/db/schema";
import { ensureDemoUser } from "@/lib/backend/bootstrap";
import { createId, demoUserId, jsonError } from "@/lib/backend/http";

export async function GET() {
  try {
    const db = getDb();
    await ensureDemoUser(db);

    const existing = await db
      .select()
      .from(aiInsights)
      .where(eq(aiInsights.userId, demoUserId))
      .orderBy(desc(aiInsights.createdAt))
      .limit(5);

    if (existing.length) {
      return Response.json({ insights: existing });
    }

    const [insight] = await db
      .insert(aiInsights)
      .values({
        id: createId("insight"),
        userId: demoUserId,
        insightType: "schedule_adjustment",
        body: "Your best deep work window is likely before lunch. Put the main quest first and keep afternoon sessions shorter.",
        evidenceJson: JSON.stringify({ basis: ["focus_history", "unlock_attempts", "sleep_score"] }),
      })
      .returning();

    return Response.json({ insights: [insight] });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load coach insights", 500);
  }
}
