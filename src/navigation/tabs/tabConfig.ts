import type { ComponentType } from "react";
import type { ImageSourcePropType } from "react-native";
import Animated from "react-native-reanimated";
import type { SvgProps } from "react-native-svg";

import CategoriesActiveIconSvg from "@/assets/icons/navigation/categories_active.svg";
import CategoriesIconSvg from "@/assets/icons/navigation/categories.svg";
import HomeActiveIconSvg from "@/assets/icons/navigation/home_active.svg";
import HomeIconSvg from "@/assets/icons/navigation/home.svg";
import ProfileActiveIconSvg from "@/assets/icons/navigation/profile_active.svg";
import ProfileIconSvg from "@/assets/icons/navigation/profile.svg";
import uploadIcon from "@/assets/icons/navigation/upload.webp";

// Wrapped once at module scope, not per render, so PillTabItem needs no
// createAnimatedComponent/useMemo of its own.
const HomeIcon = Animated.createAnimatedComponent(HomeIconSvg);
const HomeActiveIcon = Animated.createAnimatedComponent(HomeActiveIconSvg);
const CategoriesIcon = Animated.createAnimatedComponent(CategoriesIconSvg);
const CategoriesActiveIcon = Animated.createAnimatedComponent(CategoriesActiveIconSvg);
const ProfileIcon = Animated.createAnimatedComponent(ProfileIconSvg);
const ProfileActiveIcon = Animated.createAnimatedComponent(ProfileActiveIconSvg);

export type PillTabName = "index" | "categories" | "profile";

interface PillTabConfig {
  kind: "pill";
  name: PillTabName;
  label: string;
  // Active/inactive are genuinely different artwork (filled vs. outline),
  // not just a recolor — hence two components.
  icon: ComponentType<SvgProps>;
  activeIcon: ComponentType<SvgProps>;
}

interface FabTabConfig {
  kind: "fab";
  name: "prescription";
  label: string;
  icon: ImageSourcePropType;
}

export type TabConfig = PillTabConfig | FabTabConfig;

// Prescription is the old app's separate "upload" CTA, not a 4th pill slot.
export const tabConfigs: TabConfig[] = [
  {
    kind: "pill",
    name: "index",
    label: "Home",
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
  },
  {
    kind: "pill",
    name: "categories",
    label: "Categories",
    icon: CategoriesIcon,
    activeIcon: CategoriesActiveIcon,
  },
  {
    kind: "pill",
    name: "profile",
    label: "Profile",
    icon: ProfileIcon,
    activeIcon: ProfileActiveIcon,
  },
  {
    kind: "fab",
    name: "prescription",
    label: "Prescription",
    icon: uploadIcon,
  },
];
