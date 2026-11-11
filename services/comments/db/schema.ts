import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull(),
  deleteHash: text("delete_hash").notNull(),
}, (table) => [index("comments_article_order").on(table.slug, table.createdAt, table.id)]);

export const rateLimits = sqliteTable("comment_rate_limits", {
  key: text("key").primaryKey(),
  lastPost: integer("last_post").notNull(),
  windowStart: integer("window_start").notNull(),
  posts: integer("posts").notNull(),
}, (table) => [index("comment_rate_expiry").on(table.lastPost)]);
