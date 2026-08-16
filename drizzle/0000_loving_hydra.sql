CREATE TABLE `ai_insights` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`insight_type` text NOT NULL,
	`body` text NOT NULL,
	`evidence_json` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `blocked_apps` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`app_name` text NOT NULL,
	`coin_cost` integer NOT NULL,
	`unlock_rule_json` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `economy_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`source_type` text NOT NULL,
	`source_id` text,
	`xp_delta` integer DEFAULT 0 NOT NULL,
	`coin_delta` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `focus_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`planned_minutes` integer NOT NULL,
	`actual_minutes` integer,
	`strict_mode` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`started_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`ended_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`target_date` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`goal_id` text,
	`title` text NOT NULL,
	`cadence_json` text NOT NULL,
	`reward_xp` integer DEFAULT 25 NOT NULL,
	`reward_coins` integer DEFAULT 10 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`age` integer,
	`occupation` text,
	`track` text NOT NULL,
	`primary_goal` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `unlock_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`focus_session_id` text,
	`app_name` text NOT NULL,
	`outcome` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`focus_session_id`) REFERENCES `focus_sessions`(`id`) ON UPDATE no action ON DELETE set null
);
