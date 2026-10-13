import { Image } from "expo-image";
import { memo } from "react";
import { Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

import type { ApiFooter, ApiPromise } from "../types";
import { styles } from "./TrustAndFooter.styles";

const isSvg = (url: string) => url.toLowerCase().endsWith(".svg");

function RemoteIcon({ uri, size }: { uri: string; size: number }) {
  if (isSvg(uri)) return <SvgUri uri={uri} width={size} height={size} />;
  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size }}
      contentFit="contain"
    />
  );
}

interface TrustAndFooterProps {
  promise?: ApiPromise;
  footer?: ApiFooter;
}

export const TrustAndFooter = memo(function TrustAndFooter({
  promise,
  footer,
}: TrustAndFooterProps) {
  if (!promise && !footer) return null;

  return (
    <View>
      {promise ? (
        <View style={styles.promiseSection}>
          <Text style={styles.promiseTitle}>{promise.title}</Text>
          <View style={styles.promiseRow}>
            {promise.items.map((item, index) => (
              <View key={index} style={styles.promiseItem}>
                <RemoteIcon uri={item.iconUrl} size={40} />
                <Text style={styles.promiseLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {footer ? (
        <View style={styles.footerLabels}>
          {footer.labels.map((label, index) => (
            <View key={index} style={styles.footerLabelItem}>
              <RemoteIcon uri={label.icon} size={28} />
              <Text style={styles.footerLabelText}>{label.text}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
});
