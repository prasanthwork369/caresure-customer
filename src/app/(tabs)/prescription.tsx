import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

const ACCENT = "#1D4ED8";

export default function PrescriptionScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Prescriptions</Text>

        <TouchableOpacity style={styles.uploadCard} activeOpacity={0.7}>
          <View style={styles.uploadIcon}>
            <SymbolView
              name={{ ios: "doc.badge.plus", android: "upload_file", web: "upload_file" }}
              tintColor={ACCENT}
              size={26}
            />
          </View>
          <View style={styles.uploadText}>
            <Text style={styles.uploadTitle}>Upload a prescription</Text>
            <Text style={styles.uploadSubtitle}>
              We&apos;ll get your medicines ready for order
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.emptyState}>
          <SymbolView
            name={{ ios: "doc.text.magnifyingglass", android: "description", web: "description" }}
            tintColor="#9CA3AF"
            size={40}
          />
          <Text style={styles.emptyTitle}>No prescriptions yet</Text>
          <Text style={styles.emptyBody}>
            Prescriptions you upload or receive from a consultation will show up here.
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
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  uploadCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: ACCENT,
    borderRadius: 16,
    padding: 16,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    flex: 1,
    gap: 2,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
  },
  uploadSubtitle: {
    fontSize: 13,
    color: "#DBEAFE",
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  emptyBody: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
