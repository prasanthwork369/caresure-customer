import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

import { homeApi, type ApiFeaturedMedicine } from "../api/home.api";
import type { CategoryCard, CategoryTab, Product } from "../types";

const CARD_BG_COLORS = [
  "#E1F7F3",
  "#F0F5FF",
  "#F2F9E1",
  "#FFF0F5",
  "#EBF4FF",
  "#EBFBFA",
  "#FFFDE7",
];

const mapFeaturedMedicine = (med: ApiFeaturedMedicine): Product => {
  const discountPct = med.discountPercentage ?? 0;
  const price = med.price;
  const originalPrice =
    discountPct > 0
      ? Number((price / (1 - discountPct / 100)).toFixed(2))
      : undefined;

  return {
    id: med.id,
    productId: med.productId,
    slug: med.slug,
    name: med.name,
    description: med.brand?.name ?? med.packSize ?? "",
    price,
    originalPrice,
    discount: discountPct > 0 ? `${discountPct}% OFF` : undefined,
    image: med.thumbnailUrl ? { uri: med.thumbnailUrl } : null,
    requiresPrescription: med.requiresPrescription,
  };
};

export function useHomeData() {
  const {
    data: appContent,
    isLoading: isContentLoading,
    error: contentError,
    refetch: refetchContent,
  } = useQuery({
    queryKey: QUERY_KEYS.HOME.APP_CONTENTS,
    queryFn: homeApi.getAppContents,
    staleTime: 10 * 60_000,
  });

  const {
    data: families = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: QUERY_KEYS.HOME.CATEGORY_MAP,
    queryFn: homeApi.getCategoryFamilyMap,
    staleTime: 5 * 60_000,
  });

  const {
    data: featuredMedicines = [],
    isLoading: isFeaturedLoading,
    error: featuredError,
    refetch: refetchFeatured,
  } = useQuery({
    queryKey: QUERY_KEYS.HOME.FEATURED_MEDICINES,
    queryFn: () => homeApi.getFeaturedMedicines(10),
    staleTime: 5 * 60_000,
  });

  const tabs: CategoryTab[] = useMemo(
    () =>
      families.map((family) => {
        const toSource = (url?: string | null) =>
          url ? { uri: url } : undefined;
        return {
          id: family.id,
          label: family.mobileShortName || family.name,
          imageActive:
            toSource(family.mobIconUrl) ?? toSource(family.iconActive),
          imageInactive:
            toSource(family.mobIconUrl) ?? toSource(family.iconInactive),
        };
      }),
    [families],
  );

  const cards: CategoryCard[] = useMemo(() => {
    const seen = new Set<string>();
    return families.flatMap((family) =>
      (family.subCategories ?? [])
        .filter((sub) => {
          if (seen.has(sub.id)) return false;
          seen.add(sub.id);
          return true;
        })
        .map((sub, idx) => ({
          id: sub.id,
          slug: sub.slug,
          familyId: family.id,
          familySlug: family.slug,
          label: sub.name,
          image: sub.imageUrl ? { uri: sub.imageUrl } : null,
          bgColor: CARD_BG_COLORS[idx % CARD_BG_COLORS.length],
        })),
    );
  }, [families]);

  const featuredProducts: Product[] = useMemo(
    () => featuredMedicines.map(mapFeaturedMedicine),
    [featuredMedicines],
  );

  const isLoading = isContentLoading || isCategoriesLoading;
  const error = contentError || categoriesError || featuredError;

  const refetch = async () => {
    await Promise.all([refetchContent(), refetchCategories(), refetchFeatured()]);
  };

  return {
    appContent,
    tabs,
    cards,
    featuredProducts,
    isLoading,
    isFeaturedLoading,
    error,
    refetch,
  };
}
