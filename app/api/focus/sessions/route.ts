import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { economyEvents, focusSessions } from "@/db/schema";
import { ensureDemoUser } from "@/lib/backend/bootstrap";
import { createId, demoUserId, jsonError, readJson } from "@/lib/backend/http";
import type { FocusSessionInput } from "@/lib/backend/types";

export async function GET() {
  try {
    const db = getDb();
    await ensureDemoUser(db);

    const sessions = await db
      .select()
      .from(focusSessions)
      .where(eq(focusSessions.userId, demoUserId))
      .limit(20);

    return Response.json({ sessions });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load focus sessions", 500);
  }
}

export async function POST(request: Request) {
  try {
    const input = await readJson<FocusSessionInput>(request);
    if (!input.plannedMinutes || input.plannedMinutes < 5 || input.plannedMinutes > 240) {
      return jsonError("plannedMinutes must be between 5 and 240");
    }

    const db = getDb();
    await ensureDemoUser(db);

    const [session] = await db
      .insert(focusSessions)
      .values({
        id: createId("focus"),
        userId: demoUserId,
        plannedMinutes: input.plannedMinutes,
        strictMode: Boolean(input.strictMode),
      })
      .returning();

    await db.insert(economyEvents).values({
      id: createId("eco"),
      userId: demoUserId,
      sourceType: "focus_started",
      sourceId: session.id,
      xpDelta: 10,
      coinDelta: 0,
    });

    return Response.json({ session }, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create focus session", 500);
  }
}
