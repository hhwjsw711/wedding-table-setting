export type PartnerCategory =
  | "venue"
  | "planner"
  | "photographer"
  | "florist"
  | "catering"
  | "attire";

export type Partner = {
  id: string;
  category: PartnerCategory;
  website: string;
  featured?: boolean;
};

export const partners: Partner[] = [
  { id: "villa-deste", category: "venue", website: "https://www.villadeste.com", featured: true },
  { id: "bella-sposa", category: "planner", website: "#", featured: true },
  { id: "luce-photography", category: "photographer", website: "#", featured: true },
];
