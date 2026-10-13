import VerifiedUserIcon from "@/assets/icons/verified_user.svg";
import * as WebBrowser from "expo-web-browser";
import { Text, View } from "react-native";

import { WEB_BASE_URL } from "@/constants/urls";

import { styles } from "./AuthFooter.styles";

const POLICY_URLS = {
  terms: `${WEB_BASE_URL}/terms`,
  privacy: `${WEB_BASE_URL}/privacy`,
  refund: `${WEB_BASE_URL}/returns`,
} as const;

// External tab, not an in-app WebView — matches the old app's behavior.
const openPolicy = (url: string) => {
  WebBrowser.openBrowserAsync(url);
};

export function AuthFooter() {
  return (
    <View style={styles.wrap}>
      <View style={styles.secureRow}>
        <VerifiedUserIcon width={15} height={15} />
        <Text style={styles.secureText}>Secure & Encrypted</Text>
      </View>
      <Text style={styles.policyText}>
        By continuing, you agree to our{" "}
        <Text
          style={styles.policyLink}
          accessibilityRole="link"
          onPress={() => openPolicy(POLICY_URLS.terms)}
        >
          Terms
        </Text>
        ,{" "}
        <Text
          style={styles.policyLink}
          accessibilityRole="link"
          onPress={() => openPolicy(POLICY_URLS.privacy)}
        >
          Privacy Policy
        </Text>{" "}
        &{" "}
        <Text
          style={styles.policyLink}
          accessibilityRole="link"
          onPress={() => openPolicy(POLICY_URLS.refund)}
        >
          Refund Policy
        </Text>
      </Text>
    </View>
  );
}
