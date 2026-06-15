import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return [];
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) return [];
    return ctx.db
      .query("tables")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
  },
});

export const listPublic = query({
  args: { planId: v.id("plans"), shareToken: v.string() },
  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.shareToken !== args.shareToken) return [];
    return ctx.db
      .query("tables")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
  },
});

export const create = mutation({
  args: {
    planId: v.id("plans"),
    name: v.string(),
    shape: v.union(v.literal("round"), v.literal("rectangular")),
    roundSeats: v.number(),
    topSeats: v.number(),
    rightSeats: v.number(),
    bottomSeats: v.number(),
    leftSeats: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    if (args.name.length > 100) throw new Error("Name too long");

    return ctx.db.insert("tables", {
      planId: args.planId,
      name: args.name,
      shape: args.shape,
      roundSeats: args.roundSeats,
      topSeats: args.topSeats,
      rightSeats: args.rightSeats,
      bottomSeats: args.bottomSeats,
      leftSeats: args.leftSeats,
    });
  },
});

export const duplicate = mutation({
  args: {
    planId: v.id("plans"),
    sourceTableId: v.id("tables"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const source = await ctx.db.get(args.sourceTableId);
    if (!source || source.planId !== args.planId) throw new Error("Source table not found");

    return ctx.db.insert("tables", {
      planId: args.planId,
      name: args.name,
      shape: source.shape,
      roundSeats: source.roundSeats,
      topSeats: source.topSeats,
      rightSeats: source.rightSeats,
      bottomSeats: source.bottomSeats,
      leftSeats: source.leftSeats,
    });
  },
});

export const update = mutation({
  args: {
    tableId: v.id("tables"),
    patch: v.object({
      name: v.optional(v.string()),
      shape: v.optional(v.union(v.literal("round"), v.literal("rectangular"))),
      roundSeats: v.optional(v.number()),
      topSeats: v.optional(v.number()),
      rightSeats: v.optional(v.number()),
      bottomSeats: v.optional(v.number()),
      leftSeats: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const table = await ctx.db.get(args.tableId);
    if (!table) throw new Error("Table not found");
    const plan = await ctx.db.get(table.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const updated = { ...table, ...args.patch };

    const seatConfigChanged =
      args.patch.shape !== undefined ||
      args.patch.roundSeats !== undefined ||
      args.patch.topSeats !== undefined ||
      args.patch.rightSeats !== undefined ||
      args.patch.bottomSeats !== undefined ||
      args.patch.leftSeats !== undefined;

    if (seatConfigChanged) {
      const newSeatIds = computeSeatIds(table._id, updated);
      const assignments = await ctx.db
        .query("assignments")
        .withIndex("by_planId", (q) => q.eq("planId", table.planId))
        .collect();

      const tableSeatPrefix = `${table._id}:`;
      for (const a of assignments) {
        if (a.seatId.startsWith(tableSeatPrefix) && !newSeatIds.has(a.seatId)) {
          await ctx.db.delete(a._id);
        }
      }
    }

    return ctx.db.patch(args.tableId, args.patch);
  },
});

export const remove = mutation({
  args: { tableId: v.id("tables") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const table = await ctx.db.get(args.tableId);
    if (!table) throw new Error("Table not found");
    const plan = await ctx.db.get(table.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const tableSeatPrefix = `${args.tableId}:`;
    const assignments = await ctx.db
      .query("assignments")
      .withIndex("by_planId", (q) => q.eq("planId", table.planId))
      .collect();

    await Promise.all([
      ...assignments
        .filter((a) => a.seatId.startsWith(tableSeatPrefix))
        .map((a) => ctx.db.delete(a._id)),
      ctx.db.delete(args.tableId),
    ]);
  },
});

function computeSeatIds(
  tableId: string,
  table: { shape: string; roundSeats: number; topSeats: number; rightSeats: number; bottomSeats: number; leftSeats: number },
) {
  const ids = new Set<string>();
  if (table.shape === "round") {
    for (let i = 1; i <= table.roundSeats; i++) {
      ids.add(`${tableId}:ring:${i}`);
    }
  } else {
    for (let i = 1; i <= table.topSeats; i++) ids.add(`${tableId}:top:${i}`);
    for (let i = 1; i <= table.rightSeats; i++) ids.add(`${tableId}:right:${i}`);
    for (let i = 1; i <= table.bottomSeats; i++) ids.add(`${tableId}:bottom:${i}`);
    for (let i = 1; i <= table.leftSeats; i++) ids.add(`${tableId}:left:${i}`);
  }
  return ids;
}
