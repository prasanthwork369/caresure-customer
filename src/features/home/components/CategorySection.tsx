import { Image } from "expo-image";
import { memo, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { radius, spacing } from "@/theme";

import type { CategoryCard, CategoryTab } from "../types";
import { styles } from "./CategorySection.styles";

interface CategorySectionProps {
  tabs: CategoryTab[];
  cards: CategoryCard[];
  onCardPress: (card: CategoryCard) => void;
}

const NUM_COLUMNS = 4;
const GRID_GAP = spacing[2];
const GRID_PADDING = spacing[4];

export const CategorySection = memo(function CategorySection({
  tabs,
  cards,
  onCardPress,
}: CategorySectionProps) {
  const [activeId, setActiveId] = useState<string | null>(tabs[0]?.id ?? null);
  const { width } = useWindowDimensions();

  const visibleCards = useMemo(
    () => (activeId ? cards.filter((c) => c.familyId === activeId) : cards),
    [cards, activeId],
  );

  const cardWidth =
    (width - GRID_PADDING * 2 - GRID_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
  const cardHeight = cardWidth * (128 / 114);

  if (tabs.length === 0) return null;

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsBorder}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          const icon = isActive ? tab.imageActive : tab.imageInactive;
          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveId(tab.id)}
              style={styles.tabItem}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
            >
              {icon ? (
                <Image source={icon} style={styles.tabIcon} contentFit="contain" />
              ) : (
                <View style={styles.tabIconPlaceholder} />
              )}
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
              {isActive ? <View style={styles.tabIndicator} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.grid}>
        {visibleCards.map((card) => (
          <Pressable
            key={card.id}
            onPress={() => onCardPress(card)}
            style={[
              styles.card,
              {
                width: cardWidth,
                height: cardHeight,
                backgroundColor: card.bgColor,
                borderRadius: radius.md,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={card.label}
          >
            <Text style={styles.cardLabel} numberOfLines={2}>
              {card.label}
            </Text>
            {card.image ? (
              <Image
                source={card.image}
                style={{
                  width: cardWidth * 0.68,
                  height: cardHeight * 0.68,
                  position: "absolute",
                  bottom: spacing[2],
                  alignSelf: "center",
                }}
                contentFit="contain"
              />
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
});
