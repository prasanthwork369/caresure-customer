import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  type LayoutChangeEvent,
  RefreshControl,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme";

import { BannerCarousel } from "./components/BannerCarousel";
import { CategorySection } from "./components/CategorySection";
import { HeroBanner } from "./components/HeroBanner";
import { HomeHeader } from "./components/HomeHeader";
import { ProductRail } from "./components/ProductRail";
import { SearchBar } from "./components/SearchBar";
import { TrustAndFooter } from "./components/TrustAndFooter";
import { useHomeData } from "./hooks/useHomeData";
import { useHomeScroll } from "./hooks/useHomeScroll";
import { styles } from "./HomeScreen.styles";
import type { ApiBanner, CategoryCard, Product } from "./types";

const HERO_GRADIENT = ["#DEF5B0", "#EAF9D1", "#F6FDF0", "#FFFFFF"] as const;

// FlashList has no built-in Reanimated wrapper the way FlatList does — this
// is required for the scroll-driven tab bar / status bar animations below.
const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList,
) as unknown as typeof FlashList;

type SectionId =
  | "hero"
  | "search"
  | "categories"
  | "banner"
  | "featured"
  | "trustAndFooter";

const SECTIONS: { id: SectionId }[] = [
  { id: "hero" },
  { id: "search" },
  { id: "categories" },
  { id: "banner" },
  { id: "featured" },
  { id: "trustAndFooter" },
];

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [heroHeight, setHeroHeight] = useState(280);
  const { handleScroll, statusBarBgStyle } = useHomeScroll(heroHeight);

  const {
    appContent,
    tabs,
    cards,
    featuredProducts,
    isLoading,
    error,
    refetch,
  } = useHomeData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch().finally(() => setIsRefreshing(false));
  }, [refetch]);

  const onHeroLayout = useCallback((e: LayoutChangeEvent) => {
    setHeroHeight(e.nativeEvent.layout.height);
  }, []);

  // Address/Location picker, Notifications, Search, Categories, and Product
  // Details are separate not-yet-built features (see AGENTS.md step-by-step
  // rule) — these are honest no-op stubs, not fake navigation.
  const onPressLocation = useCallback(() => {}, []);
  const onPressNotifications = useCallback(() => {}, []);
  const onPressSearch = useCallback(() => {}, []);
  const onCardPress = useCallback((_card: CategoryCard) => {}, []);
  const onProductPress = useCallback((_product: Product) => {}, []);
  const onPressBanner = useCallback((_banner: ApiBanner) => {}, []);

  const renderSection: ListRenderItem<{ id: SectionId }> = useCallback(
    ({ item }) => {
      switch (item.id) {
        case "hero":
          // No background here — this row sits on top of the fixed gradient
          // backdrop rendered behind the whole list (see below), so scroll
          // pull-to-refresh/overscroll never shows a mismatched color.
          return (
            <View onLayout={onHeroLayout}>
              <HomeHeader
                location="Select delivery location"
                onPressLocation={onPressLocation}
                onPressNotifications={onPressNotifications}
              />
              <HeroBanner hero={appContent?.hero} />
            </View>
          );
        case "search":
          return (
            <View style={styles.searchWrap}>
              <SearchBar onPress={onPressSearch} />
            </View>
          );
        case "categories":
          return (
            <View style={styles.sectionGap}>
              <CategorySection tabs={tabs} cards={cards} onCardPress={onCardPress} />
            </View>
          );
        case "banner":
          return (
            <View style={styles.sectionGap}>
              <BannerCarousel
                banners={appContent?.banners ?? []}
                onPressBanner={onPressBanner}
              />
            </View>
          );
        case "featured":
          return (
            <View style={styles.sectionGap}>
              <ProductRail
                title="Smart Substitution"
                products={featuredProducts}
                onProductPress={onProductPress}
              />
            </View>
          );
        case "trustAndFooter":
          return (
            <TrustAndFooter
              promise={appContent?.promise}
              footer={appContent?.footer}
            />
          );
        default:
          return null;
      }
    },
    [
      appContent,
      cards,
      featuredProducts,
      onCardPress,
      onHeroLayout,
      onPressBanner,
      onPressLocation,
      onPressNotifications,
      onPressSearch,
      onProductPress,
      tabs,
    ],
  );

  const contentContainerStyle = useMemo(
    () => ({ paddingBottom: insets.bottom + 100 }),
    [insets.bottom],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        tintColor="#0F7635"
      />
    ),
    [isRefreshing, onRefresh],
  );

  const hasContent = !!appContent || tabs.length > 0 || featuredProducts.length > 0;

  if (isLoading && !hasContent) {
    return (
      <View style={[styles.root, styles.centerFill]}>
        <ActivityIndicator color={colors.brand.primary} size="large" />
      </View>
    );
  }

  if (error && !hasContent) {
    return (
      <View style={[styles.root, styles.centerFill]}>
        <Text style={styles.errorText}>Could not load home. Pull to retry.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Fixed backdrop, not part of the scrolling list — `top: 0` is
          relative to this unshifted root, so on edge-to-edge Android it
          reaches the true top of the window (under the status bar) without
          needing any negative-margin offset math on the list itself. */}
      <LinearGradient
        colors={HERO_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.heroBackdrop, { height: insets.top + heroHeight }]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.statusBarBg, { height: insets.top }, statusBarBgStyle]}
      />
      <AnimatedFlashList
        data={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderSection}
        getItemType={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={contentContainerStyle}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={refreshControl}
      />
    </View>
  );
}
