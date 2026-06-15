import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  plans: defineTable({
    userId: v.string(),
    name: v.string(),
    shareToken: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_shareToken", ["shareToken"]),

  tables: defineTable({
    planId: v.id("plans"),
    name: v.string(),
    shape: v.union(v.literal("round"), v.literal("rectangular")),
    roundSeats: v.float64(),
    topSeats: v.float64(),
    rightSeats: v.float64(),
    bottomSeats: v.float64(),
    leftSeats: v.float64(),
  }).index("by_planId", ["planId"]),

  guests: defineTable({
    planId: v.id("plans"),
    name: v.string(),
    group: v.string(),
    dietary: v.string(),
  }).index("by_planId", ["planId"]),

  assignments: defineTable({
    planId: v.id("plans"),
    seatId: v.string(),
    guestId: v.id("guests"),
  })
    .index("by_planId", ["planId"])
    .index("by_planId_and_seatId", ["planId", "seatId"])
    .index("by_planId_and_guestId", ["planId", "guestId"]),
});
