import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  displayName: text("display_name").notNull(),
  age: integer("age"),
  occupation: text("occupation"),
  track: text("track", { enum: ["student", "professional"] }).notNull(),
  primaryGoal: text("primary_goal").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const goals = sqliteTable(
  "goals",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    category: text("category").notNull(),
    targetDate: text("target_date"),
    status: text("status", { enum: ["active", "paused", "complete"] }).notNull().default("active"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_goals_user_created").on(table.userId, table.createdAt)],
);

export const habits = sqliteTable(
  "habits",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    goalId: text("goal_id").references(() => goals.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    cadenceJson: text("cadence_json").notNull(),
    rewardXp: integer("reward_xp").notNull().default(25),
    rewardCoins: integer("reward_coins").notNull().default(10),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_habits_user_created").on(table.userId, table.createdAt),
    index("idx_habits_goal").on(table.goalId),
  ],
);

export const focusSessions = sqliteTable(
  "focus_sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    plannedMinutes: integer("planned_minutes").notNull(),
    actualMinutes: integer("actual_minutes"),
    strictMode: integer("strict_mode", { mode: "boolean" }).notNull().default(false),
    status: text("status", { enum: ["active", "completed", "cancelled", "emergency_unlocked"] }).notNull().default("active"),
    startedAt: text("started_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    endedAt: text("ended_at"),
  },
  (table) => [index("idx_focus_sessions_user_started").on(table.userId, table.startedAt)],
);

export const blockedApps = sqliteTable(
  "blocked_apps",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    appName: text("app_name").notNull(),
    coinCost: integer("coin_cost").notNull(),
    unlockRuleJson: text("unlock_rule_json").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_blocked_apps_user").on(table.userId)],
);

export const unlockAttempts = sqliteTable(
  "unlock_attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    focusSessionId: text("focus_session_id").references(() => focusSessions.id, { onDelete: "set null" }),
    appName: text("app_name").notNull(),
    outcome: text("outcome", { enum: ["blocked", "unlocked", "future_self_shown", "emergency"] }).notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_unlock_attempts_user_created").on(table.userId, table.createdAt),
    index("idx_unlock_attempts_focus_session").on(table.focusSessionId),
  ],
);

export const economyEvents = sqliteTable(
  "economy_events",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    sourceType: text("source_type").notNull(),
    sourceId: text("source_id"),
    xpDelta: integer("xp_delta").notNull().default(0),
    coinDelta: integer("coin_delta").notNull().default(0),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_economy_events_user").on(table.userId)],
);

export const aiInsights = sqliteTable(
  "ai_insights",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    insightType: text("insight_type").notNull(),
    body: text("body").notNull(),
    evidenceJson: text("evidence_json").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_ai_insights_user_created").on(table.userId, table.createdAt)],
);
