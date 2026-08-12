import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

const ACCENT = "#1D4ED8";

type Category = {
  id: string;
  label: string;
  description: string;
  icon: SymbolViewProps["name"];
};

const CATEGORIES: Category[] = [
  {
    id: "medicines",
    label: "Medicines",
    description: "Order prescription & OTC medicines",
    icon: { ios: "pills.fill", android: "medication", web: "medication" },
  },
  {
    id: "lab-tests",
    label: "Lab Tests",
    description: "Book diagnostic tests at home",
    icon: { ios: "testtube.2", android: "science", web: "science" },
  },
  {
    id: "consultations",
    label: "Consultations",
    description: "Talk to a doctor online",
    icon: { ios: "stethoscope", android: "local_hospital", web: "local_hospital" },
  },
  {
    id: "health-devices",
    label: "Health Devices",
    description: "Monitors, glucometers & more",
    icon: { ios: "waveform.path.ecg", android: "devices", web: "devices" },
  },
  {
    id: "wellness",
    label: "Wellness",
    description: "Vitamins, supplements & fitness",
    icon: { ios: "heart.text.square.fill", android: "spa", web: "spa" },
  },
  {
    id: "baby-care",
    label: "Baby Care",
    description: "Everything for mother & baby",
    icon: {
      ios: "figure.and.child.holdinghands",
      android: "child_care",
      web: "child_care",
    },
  },
];

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<Text style={styles.title}>Categories</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={styles.rowIcon}>
              <SymbolView name={item.icon} tintColor={ACCENT} size={24} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  rowDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
});
