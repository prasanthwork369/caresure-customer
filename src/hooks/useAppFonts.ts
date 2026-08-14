import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Platform } from "react-native";

// Inter is only loaded on Android — iOS renders correctly on the native SF
// Pro system font and never needs these files. Only the weights the app
// actually uses (theme.fontWeight) are loaded.
export function useAppFonts(): boolean {
  const [loaded] = useFonts(
    Platform.OS === "android"
      ? {
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
        }
      : {},
  );
  return loaded;
}
