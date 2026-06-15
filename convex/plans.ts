import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return [];
    return ctx.db
      .query("plans")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    if (args.name.length > 200) throw new Error("Name too long");
    const now = Date.now();
    return ctx.db.insert("plans", {
      userId,
      name: args.name,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: { planId: v.id("plans"), name: v.string() },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");
    if (args.name.length > 200) throw new Error("Name too long");
    return ctx.db.patch(args.planId, {
      name: args.name,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const tables = await ctx.db
      .query("tables")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
    const guests = await ctx.db
      .query("guests")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
    const assignments = await ctx.db
      .query("assignments")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();

    await Promise.all([
      ...tables.map((t) => ctx.db.delete(t._id)),
      ...guests.map((g) => ctx.db.delete(g._id)),
      ...assignments.map((a) => ctx.db.delete(a._id)),
      ctx.db.delete(args.planId),
    ]);
  },
});

export const generateShareToken = mutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const token = crypto.randomUUID();
    await ctx.db.patch(args.planId, {
      shareToken: token,
      updatedAt: Date.now(),
    });
    return token;
  },
});

export const getByShareToken = query({
  args: { shareToken: v.string() },
  handler: async (ctx, args) => {
    const plan = await ctx.db
      .query("plans")
      .withIndex("by_shareToken", (q) => q.eq("shareToken", args.shareToken))
      .first();
    if (!plan) return null;
    const { userId: _, ...safe } = plan;
    return safe;
  },
});

export const getById = query({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return null;
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) return null;
    return plan;
  },
});
