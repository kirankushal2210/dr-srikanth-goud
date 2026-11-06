import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const representationsTable = pgTable("representations", {
  id: serial("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email"),
  constituency: text("constituency").notNull(),
  category: text("category").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("RECEIVED"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRepresentationSchema = createInsertSchema(representationsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertRepresentation = typeof representationsTable.$inferInsert;
export type Representation = typeof representationsTable.$inferSelect;
