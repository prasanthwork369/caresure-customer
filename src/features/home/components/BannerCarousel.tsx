import { Image } from "expo-image";
import { memo, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import type { ApiBanner } from "../types";
import { styles } from "./BannerCarousel.styles";

const AUTO_ADVANCE_MS = 3500;
const BANNER_HEIGHT = 176;

interface BannerCarouselProps {
  banners: ApiBanner[];
  onPressBanner: (banner: ApiBanner) => void;
}

export const BannerCarousel = memo(function BannerCarousel({
  banners,
  onPressBanner,
}: BannerCarouselProps) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % banners.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [banners.length, width]);

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  if (banners.length === 0) return null;

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
      >
        {banners.map((banner, index) => (
          <Pressable
            key={`${banner.link}-${index}`}
            onPress={() => onPressBanner(banner)}
            style={{ width, height: BANNER_HEIGHT, paddingHorizontal: 16 }}
            accessibilityRole="button"
            accessibilityLabel={banner.alt}
          >
            <Image
              source={{ uri: banner.imageUrl }}
              style={styles.image}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </Pressable>
        ))}
      </ScrollView>

      {banners.length > 1 ? (
        <View style={styles.dots}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
});
