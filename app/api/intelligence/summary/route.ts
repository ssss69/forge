import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { focusSessions, unlockAttempts } from "@/db/schema";
import { ensureDemoUser } from "@/lib/backend/bootstrap";
import { demoUserId, jsonError } from "@/lib/backend/http";
import { focusScore } from "@/lib/backend/scoring";

export async function GET() {
  try {
    const db = getDb();
    await ensureDemoUser(db);

    const sessions = await db
      .select()
      .from(focusSessions)
      .where(eq(focusSessions.userId, demoUserId));
    const attempts = await db
      .select()
      .from(unlockAttempts)
      .where(eq(unlockAttempts.userId, demoUserId));

    const completedMinutes = sessions.reduce(
      (total, session) => total + (session.actualMinutes ?? session.plannedMinutes),
      0,
    );

    return Response.json({
      summary: {
        focusScore: focusScore(completedMinutes, attempts.length),
        deepWorkHours: Number((completedMinutes / 60).toFixed(1)),
        distractionFrequency: attempts.length,
        peakProductivityHours: "8:20-10:40 AM",
        recoveryScore: 79,
        goalCompletionPrediction: 92,
      },
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load intelligence summary", 500);
  }
}
