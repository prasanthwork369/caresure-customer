import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

const ACCENT = "#1D4ED8";

type MenuItem = {
  id: string;
  label: string;
  icon: SymbolViewProps["name"];
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: "orders",
    label: "My Orders",
    icon: { ios: "shippingbox.fill", android: "local_shipping", web: "local_shipping" },
  },
  {
    id: "addresses",
    label: "Saved Addresses",
    icon: { ios: "location.fill", android: "location_on", web: "location_on" },
  },
  {
    id: "family",
    label: "Family Members",
    icon: { ios: "person.2.fill", android: "group", web: "group" },
  },
  {
    id: "payments",
    label: "Payment Methods",
    icon: { ios: "creditcard.fill", android: "credit_card", web: "credit_card" },
  },
  {
    id: "support",
    label: "Help & Support",
    icon: { ios: "questionmark.circle.fill", android: "help", web: "help" },
  },
  {
    id: "settings",
    label: "Settings",
    icon: { ios: "gearshape.fill", android: "settings", web: "settings" },
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <SymbolView
              name={{ ios: "person.fill", android: "person", web: "person" }}
              tintColor={ACCENT}
              size={32}
            />
          </View>
          <View>
            <Text style={styles.name}>Guest User</Text>
            <Text style={styles.email}>Sign in to manage your health</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuRow} activeOpacity={0.7}>
              <SymbolView name={item.icon} tintColor="#374151" size={20} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <SymbolView
                name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }}
                tintColor="#9CA3AF"
                size={16}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOut} activeOpacity={0.7}>
          <Text style={styles.signOutLabel}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
    gap: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  email: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  menu: {
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  signOut: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  signOutLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#DC2626",
  },
});
