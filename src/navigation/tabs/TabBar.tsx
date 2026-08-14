import { BlurView } from "expo-blur";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { Platform, StyleSheet, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FabButton } from "./FabButton";
import { PillTabItem } from "./PillTabItem";
import { tabConfigs, type TabConfig } from "./tabConfig";
import { BAR_BOTTOM_GAP, BAR_HEIGHT, styles } from "./TabBar.styles";
import { useTabBarAnimation } from "./useTabBarAnimation";

const pillTabConfigs = tabConfigs.filter(
  (tab): tab is Extract<TabConfig, { kind: "pill" }> => tab.kind === "pill",
);
const fabTabConfig = tabConfigs.find(
  (tab): tab is Extract<TabConfig, { kind: "fab" }> => tab.kind === "fab",
)!;

/**
 * CareSure tab bar: floating glass pill (Home/Categories/Profile) with a
 * sliding indicator, plus the Prescription CTA.
 */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeRouteName = state.routes[state.index]?.name;
  const activePillIndex = pillTabConfigs.findIndex(
    (tab) => tab.name === activeRouteName,
  );

  const navigateToPillTab = (index: number) => {
    const tab = pillTabConfigs[index];
    if (tab && tab.name !== activeRouteName) navigation.navigate(tab.name);
  };

  const { gesture, onPillLayout, pillIndicatorStyle, followerX, pillOpacity } =
    useTabBarAnimation({
      activePillIndex,
      onNavigateToPillTab: navigateToPillTab,
    });

  return (
    <View
      style={[
        styles.container,
        {
          height: BAR_HEIGHT + insets.bottom + BAR_BOTTOM_GAP,
          paddingBottom: insets.bottom + BAR_BOTTOM_GAP,
        },
      ]}
      pointerEvents="box-none"
    >
      <GestureDetector gesture={gesture}>
        <View style={styles.pill} onLayout={onPillLayout}>
          {/* Android's BlurView is experimental — a flat tint reads better there. */}
          {Platform.OS === "ios" ? (
            <BlurView
              intensity={45}
              tint="systemUltraThinMaterialLight"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[StyleSheet.absoluteFill, styles.androidGlassFallback]}
            />
          )}

          <Animated.View style={[styles.indicator, pillIndicatorStyle]} />

          {pillTabConfigs.map((tab, index) => (
            <PillTabItem
              key={tab.name}
              index={index}
              label={tab.label}
              icon={tab.icon}
              activeIcon={tab.activeIcon}
              isActive={index === activePillIndex}
              followerX={followerX}
              pillOpacity={pillOpacity}
              onPress={() => navigateToPillTab(index)}
            />
          ))}
        </View>
      </GestureDetector>

      <FabButton
        icon={fabTabConfig.icon}
        label={fabTabConfig.label}
        isActive={activeRouteName === fabTabConfig.name}
        onPress={() => {
          if (activeRouteName !== fabTabConfig.name) {
            navigation.navigate(fabTabConfig.name);
          }
        }}
      />
    </View>
  );
}
