import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Image, View, type ImageSourcePropType } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@/theme";

import { styles, TILE_GAP, TILE_SIZE } from "./AuthBackground.styles";

// Real CareSure product photography (migrated from the old app's
// assets/images/auth/).
const MEDICINE_IMAGES: ImageSourcePropType[] = [
  require("@/assets/images/auth/medicine-1.webp"),
  require("@/assets/images/auth/medicine-2.webp"),
  require("@/assets/images/auth/medicine-3.webp"),
  require("@/assets/images/auth/medicine-4.png"),
  require("@/assets/images/auth/medicine-5.webp"),
  require("@/assets/images/auth/medicine-6.webp"),
  require("@/assets/images/auth/medicine-7.webp"),
  require("@/assets/images/auth/medicine-8.webp"),
  require("@/assets/images/auth/medicine-9.webp"),
  require("@/assets/images/auth/medicine-10.webp"),
  require("@/assets/images/auth/medicine-11.webp"),
  require("@/assets/images/auth/medicine-12.webp"),
];

// Same grouping the old app used, plus a 4th column reusing column 1 in
// reverse — matches its visual rhythm without needing a 13th photo.
const COLUMNS: ImageSourcePropType[][] = [
  MEDICINE_IMAGES.slice(0, 4),
  MEDICINE_IMAGES.slice(4, 8),
  MEDICINE_IMAGES.slice(8, 12),
  [...MEDICINE_IMAGES.slice(0, 4)].reverse(),
];

// Vertical stagger per column, matching the old app's offsets.
const COLUMN_OFFSETS = [40, -80, 20, -40];
const SCROLL_DURATION_MS = 12000;

function Tile({
  image,
  colorIndex,
}: {
  image: ImageSourcePropType;
  colorIndex: number;
}) {
  const backgroundColor = colors.pastels[colorIndex % colors.pastels.length];
  return (
    <View style={[styles.tile, { backgroundColor }]}>
      <Image source={image} style={styles.tileImage} resizeMode="contain" />
    </View>
  );
}

function ScrollingColumn({
  images,
  offset,
  colorOffset,
  reducedMotion,
}: {
  images: ImageSourcePropType[];
  offset: number;
  colorOffset: number;
  reducedMotion: boolean;
}) {
  // Height of exactly one full set — the loop resets by this amount, so the
  // instant jump-back lands on a visually identical frame (the tripled set
  // below means copy 2 is already sitting where copy 1 started).
  const cycleHeight = images.length * (TILE_SIZE + TILE_GAP);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) return;
    translateY.value = withRepeat(
      withTiming(-cycleHeight, {
        duration: SCROLL_DURATION_MS,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [cycleHeight, reducedMotion, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const tiles = reducedMotion ? images : [...images, ...images, ...images];

  return (
    <Animated.View
      style={[styles.column, { marginTop: offset }, animatedStyle]}
    >
      {tiles.map((image, index) => (
        <Tile
          key={index}
          image={image}
          colorIndex={(index % images.length) + colorOffset}
        />
      ))}
    </Animated.View>
  );
}

export function AuthBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <View style={styles.root}>
      {COLUMNS.map((images, index) => (
        <ScrollingColumn
          key={index}
          images={images}
          offset={COLUMN_OFFSETS[index]}
          colorOffset={index * 2}
          reducedMotion={reducedMotion}
        />
      ))}

      <LinearGradient
        colors={["rgba(255,255,255,0.7)", "rgba(255,255,255,0)"]}
        style={styles.topFade}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.5)",
          "rgba(255,255,255,0.9)",
          colors.white,
        ]}
        style={styles.bottomFade}
        pointerEvents="none"
      />
    </View>
  );
}
