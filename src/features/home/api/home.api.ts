import { apiClient } from "@/api";

import type { ApiAppContent } from "../types";

interface ApiSubCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

interface ApiCategoryFamily {
  id: string;
  name: string;
  mobileShortName?: string | null;
  slug: string;
  iconActive: string | null;
  iconInactive: string | null;
  mobIconUrl?: string | null;
  subCategories: ApiSubCategory[];
}

interface ApiBrand {
  name: string;
}

export interface ApiFeaturedMedicine {
  id: string;
  productId: string;
  name: string;
  slug: string;
  packSize: string;
  price: number;
  discountPercentage: number;
  requiresPrescription: boolean;
  thumbnailUrl: string;
  brand?: ApiBrand;
}

const ENDPOINTS = {
  APP_CONTENTS: "/api/v1/app-contents",
  CATEGORY_FAMILY_MAP: "/api/v1/category-family/map",
  MEDICINES_FEATURED_CARDS: "/api/v1/medicines/featured/cards",
} as const;

export const homeApi = {
  getAppContents: async (): Promise<ApiAppContent> => {
    const { data } = await apiClient.get(ENDPOINTS.APP_CONTENTS);
    return data.data;
  },

  getCategoryFamilyMap: async (): Promise<ApiCategoryFamily[]> => {
    const { data } = await apiClient.get(ENDPOINTS.CATEGORY_FAMILY_MAP);
    return data?.data ?? [];
  },

  getFeaturedMedicines: async (limit = 10): Promise<ApiFeaturedMedicine[]> => {
    const { data } = await apiClient.get(ENDPOINTS.MEDICINES_FEATURED_CARDS, {
      params: { limit },
    });
    return data?.data ?? [];
  },
};

export type { ApiCategoryFamily, ApiSubCategory };
