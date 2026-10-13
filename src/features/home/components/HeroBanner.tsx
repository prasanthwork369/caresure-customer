import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

import type { ApiHero } from "../types";
import { styles } from "./HeroBanner.styles";

const HERO_GRADIENT = ["#CFE9A8", "#DEF0BF", "#ECF6D6", "#F6FBE8"] as const;

interface HeroBannerProps {
  hero?: ApiHero;
}

export const HeroBanner = memo(function HeroBanner({ hero }: HeroBannerProps) {
  if (!hero) return null;

  const highlight = hero.highlighted_text?.[0] ?? "";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={HERO_GRADIENT}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {hero.title}
            {highlight ? " " : ""}
            <Text style={styles.titleHighlight}>{highlight}</Text>
          </Text>

          <View style={styles.badge}>
            {hero.labelImage ? (
              <SvgUri uri={hero.labelImage} width={17} height={20} />
            ) : null}
            <Text style={styles.badgeText}>{hero.status_text}</Text>
          </View>
        </View>
      </LinearGradient>

      {hero.image ? (
        <View style={styles.avatar}>
          <Image
            source={{ uri: hero.image }}
            style={styles.avatarImage}
            contentFit="contain"
            contentPosition="bottom center"
            cachePolicy="memory-disk"
          />
        </View>
      ) : null}
    </View>
  );
});
