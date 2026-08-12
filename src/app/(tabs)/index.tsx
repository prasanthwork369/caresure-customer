import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

const ACCENT = "#1D4ED8";

const QUICK_ACTIONS: {
  label: string;
  icon: SymbolViewProps["name"];
}[] = [
  { label: "Order Medicine", icon: { ios: "pills.fill", android: "medication", web: "medication" } },
  { label: "Book Consultation", icon: { ios: "stethoscope", android: "stethoscope", web: "stethoscope" } },
  { label: "Upload Prescription", icon: { ios: "doc.text.fill", android: "description", web: "description" } },
  { label: "Lab Tests", icon: { ios: "testtube.2", android: "science", web: "science" } },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.title}>What do you need today?</Text>
        </View>

        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity key={action.label} style={styles.actionCard} activeOpacity={0.7}>
              <View style={styles.actionIcon}>
                <SymbolView name={action.icon} tintColor={ACCENT} size={26} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Refill reminders</Text>
          <Text style={styles.bannerBody}>
            Keep your prescriptions up to date to never miss a dose.
          </Text>
        </View>
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
  greeting: {
    fontSize: 15,
    color: "#6B7280",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "47%",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  banner: {
    backgroundColor: ACCENT,
    borderRadius: 16,
    padding: 20,
    gap: 6,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  bannerBody: {
    color: "#DBEAFE",
    fontSize: 13,
    lineHeight: 18,
  },
});
