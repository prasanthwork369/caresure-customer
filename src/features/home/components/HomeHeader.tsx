import ArrowDropDownIcon from "@/assets/icons/arrow_drop_down.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme";

import { styles } from "./HomeHeader.styles";

interface HomeHeaderProps {
  location: string;
  onPressLocation: () => void;
  onPressNotifications: () => void;
}

// Wallet balance and the notification unread badge depend on the Wallet and
// Notifications features (not built yet) — omitted rather than faked.
export const HomeHeader = memo(function HomeHeader({
  location,
  onPressLocation,
  onPressNotifications,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.row, { paddingTop: insets.top + 2 }]}>
      <Pressable
        onPress={onPressLocation}
        style={styles.locationBlock}
        accessibilityRole="button"
        accessibilityLabel={`Change delivery location, current ${location}`}
      >
        <Text style={styles.deliverLabel}>DELIVER TO</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationText} numberOfLines={1}>
            {location}
          </Text>
          <ArrowDropDownIcon width={10} height={5} fill={colors.text.primary} />
        </View>
      </Pressable>

      <Pressable
        onPress={onPressNotifications}
        style={styles.notificationBtn}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
      >
        <NotificationIcon width={22} height={24} color={colors.text.primary} />
      </Pressable>
    </View>
  );
});
