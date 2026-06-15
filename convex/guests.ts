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
      .query("guests")
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
      .query("guests")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
  },
});

export const create = mutation({
  args: {
    planId: v.id("plans"),
    name: v.string(),
    group: v.string(),
    dietary: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    if (args.name.length > 200) throw new Error("Name too long");
    if (args.group.length > 100) throw new Error("Group too long");
    if (args.dietary.length > 1000) throw new Error("Dietary too long");

    return ctx.db.insert("guests", {
      planId: args.planId,
      name: args.name,
      group: args.group,
      dietary: args.dietary,
    });
  },
});

export const batchCreate = mutation({
  args: {
    planId: v.id("plans"),
    guests: v.array(
      v.object({
        name: v.string(),
        group: v.string(),
        dietary: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    if (args.guests.length > 500) throw new Error("Too many guests at once");

    for (const guest of args.guests) {
      if (guest.name.length > 200) throw new Error("Name too long");
      if (guest.group.length > 100) throw new Error("Group too long");
      if (guest.dietary.length > 1000) throw new Error("Dietary too long");
    }

    const existing = await ctx.db
      .query("guests")
      .withIndex("by_planId", (q) => q.eq("planId", args.planId))
      .collect();
    const existingKeys = new Set(existing.map((g) => g.name.trim().toLowerCase()));

    const ids: string[] = [];
    for (const guest of args.guests) {
      const key = guest.name.trim().toLowerCase();
      if (!key || existingKeys.has(key)) continue;
      existingKeys.add(key);
      const id = await ctx.db.insert("guests", {
        planId: args.planId,
        name: guest.name,
        group: guest.group,
        dietary: guest.dietary,
      });
      ids.push(id);
    }
    return ids;
  },
});

export const update = mutation({
  args: {
    guestId: v.id("guests"),
    name: v.string(),
    group: v.string(),
    dietary: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const guest = await ctx.db.get(args.guestId);
    if (!guest) throw new Error("Guest not found");
    const plan = await ctx.db.get(guest.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    if (args.name.length > 200) throw new Error("Name too long");
    if (args.group.length > 100) throw new Error("Group too long");
    if (args.dietary.length > 1000) throw new Error("Dietary too long");

    return ctx.db.patch(args.guestId, {
      name: args.name,
      group: args.group,
      dietary: args.dietary,
    });
  },
});

export const remove = mutation({
  args: { guestId: v.id("guests") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new Error("Not authenticated");
    const guest = await ctx.db.get(args.guestId);
    if (!guest) throw new Error("Guest not found");
    const plan = await ctx.db.get(guest.planId);
    if (!plan || plan.userId !== userId) throw new Error("Not authorized");

    const assignment = await ctx.db
      .query("assignments")
      .withIndex("by_planId_and_guestId", (q) =>
        q.eq("planId", guest.planId).eq("guestId", args.guestId),
      )
      .first();

    if (assignment) {
      await ctx.db.delete(assignment._id);
    }
    return ctx.db.delete(args.guestId);
  },
});
