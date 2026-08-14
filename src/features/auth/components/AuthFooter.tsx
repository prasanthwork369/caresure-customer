import VerifiedUserIcon from "@/assets/icons/verified_user.svg";
import { Text, View } from "react-native";

import { styles } from "./AuthFooter.styles";

// Links are static text for now — the settings endpoint that supplies live
// Terms/Privacy/Refund URLs isn't built yet (no consumer to wire up).
export function AuthFooter() {
  return (
    <View style={styles.wrap}>
      <View style={styles.secureRow}>
        <VerifiedUserIcon width={15} height={15} />
        <Text style={styles.secureText}>Secure & Encrypted</Text>
      </View>
      <Text style={styles.policyText}>
        By continuing, you agree to our{" "}
        <Text style={styles.policyLink}>Terms</Text>,{" "}
        <Text style={styles.policyLink}>Privacy Policy</Text> &{" "}
        <Text style={styles.policyLink}>Refund Policy</Text>
      </Text>
    </View>
  );
}
