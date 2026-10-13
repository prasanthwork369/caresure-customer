// Central query-key registry — extend per-feature as new queries are added.
export const QUERY_KEYS = {
  HOME: {
    APP_CONTENTS: ["home", "app-contents"] as const,
    CATEGORY_MAP: ["home", "category-map"] as const,
    FEATURED_MEDICINES: ["home", "featured-medicines"] as const,
  },
} as const;
