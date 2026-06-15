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
      .query("assignments")
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
      .query("assignments")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
  },
});

export const assign = mutation({
  args: {
    planId: v.id("plans"),
    guestId: v.id("guests"),
    seatId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const guest = await ctx.db.get(args.guestId);
    if (!guest || guest.planId !== args.planId) throw new Error("Guest not in plan");

    const existingFromGuest = await ctx.db
      .query("assignments")
      .withIndex("by_planId_and_guestId", (q) =>
        q.eq("planId", args.planId).eq("guestId", args.guestId),
      )
      .first();

    const existingOnSeat = await ctx.db
      .query("assignments")
      .withIndex("by_planId_and_seatId", (q) =>
        q.eq("planId", args.planId).eq("seatId", args.seatId),
      )
      .first();

    if (existingFromGuest?.seatId === args.seatId) return;

    if (existingFromGuest) await ctx.db.delete(existingFromGuest._id);

    if (existingOnSeat) {
      await ctx.db.delete(existingOnSeat._id);
      if (existingFromGuest) {
        await ctx.db.insert("assignments", {
          planId: args.planId,
          seatId: existingFromGuest.seatId,
          guestId: existingOnSeat.guestId,
        });
      }
    }

    await ctx.db.insert("assignments", {
      planId: args.planId,
      seatId: args.seatId,
      guestId: args.guestId,
    });
  },
});

export const clear = mutation({
  args: { planId: v.id("plans"), seatId: v.string() },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const assignment = await ctx.db
      .query("assignments")
      .withIndex("by_planId_and_seatId", (q) =>
        q.eq("planId", args.planId).eq("seatId", args.seatId),
      )
      .first();

    if (assignment) {
      await ctx.db.delete(assignment._id);
    }
  },
});

export const clearTable = mutation({
  args: { planId: v.id("plans"), tableId: v.id("tables") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const tableSeatPrefix = `${args.tableId}:`;
    const assignments = await ctx.db
      .query("assignments")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();

    await Promise.all(
      assignments
        .filter((a) => a.seatId.startsWith(tableSeatPrefix))
        .map((a) => ctx.db.delete(a._id)),
    );
  },
});
