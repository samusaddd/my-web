CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL,
	`delete_hash` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `comments_article_order` ON `comments` (`slug`,`created_at`,`id`);--> statement-breakpoint
CREATE TABLE `comment_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`last_post` integer NOT NULL,
	`window_start` integer NOT NULL,
	`posts` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `comment_rate_expiry` ON `comment_rate_limits` (`last_post`);