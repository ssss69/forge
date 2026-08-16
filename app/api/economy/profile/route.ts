import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { economyEvents } from "@/db/schema";
import { ensureDemoUser } from "@/lib/backend/bootstrap";
import { demoUserId, jsonError } from "@/lib/backend/http";
import { buildEconomyProfile } from "@/lib/backend/scoring";

export async function GET() {
  try {
    const db = getDb();
    await ensureDemoUser(db);

    const events = await db
      .select()
      .from(economyEvents)
      .where(eq(economyEvents.userId, demoUserId));
    const xp = events.reduce((total, event) => total + event.xpDelta, 0);
    const coins = events.reduce((total, event) => total + event.coinDelta, 0);

    return Response.json({ profile: buildEconomyProfile(xp, coins) });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load economy profile", 500);
  }
}
