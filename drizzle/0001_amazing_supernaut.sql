CREATE INDEX `idx_ai_insights_user_created` ON `ai_insights` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_blocked_apps_user` ON `blocked_apps` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_economy_events_user` ON `economy_events` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_focus_sessions_user_started` ON `focus_sessions` (`user_id`,`started_at`);--> statement-breakpoint
CREATE INDEX `idx_goals_user_created` ON `goals` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_habits_user_created` ON `habits` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_habits_goal` ON `habits` (`goal_id`);--> statement-breakpoint
CREATE INDEX `idx_unlock_attempts_user_created` ON `unlock_attempts` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_unlock_attempts_focus_session` ON `unlock_attempts` (`focus_session_id`);