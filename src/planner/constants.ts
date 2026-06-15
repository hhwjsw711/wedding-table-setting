import type { DietaryBadgeDefinition } from "@/planner/types";

export const dietaryBadgeDefinitions: DietaryBadgeDefinition[] = [
  {
    code: "Ve",
    label: "Vegetarian",
    className: "vegetarian",
    patterns: [/\bvegetarian\b/i, /\bveggie\b/i, /^ve$/i],
  },
  {
    code: "Vg",
    label: "Vegan",
    className: "vegan",
    patterns: [/\bvegan\b/i, /^vg$/i],
  },
  {
    code: "Ce",
    label: "Celiac",
    className: "celiac",
    patterns: [/\bceliac\b/i, /\bcoeliac\b/i, /^ce$/i],
  },
  {
    code: "GF",
    label: "Gluten free",
    className: "gluten-free",
    patterns: [/\bgluten[-\s]?free\b/i, /\bno gluten\b/i],
  },
  {
    code: "Nu",
    label: "Nut allergy",
    className: "nut",
    patterns: [/\bnut allergy\b/i, /\bnuts?\b/i, /\bpeanut\b/i],
  },
  {
    code: "Da",
    label: "Dairy free",
    className: "dairy",
    patterns: [/\bdairy[-\s]?free\b/i, /\bno dairy\b/i, /\blactose\b/i],
  },
  {
    code: "Ha",
    label: "Halal",
    className: "halal",
    patterns: [/\bhalal\b/i],
  },
  {
    code: "Ko",
    label: "Kosher",
    className: "kosher",
    patterns: [/\bkosher\b/i],
  },
];
