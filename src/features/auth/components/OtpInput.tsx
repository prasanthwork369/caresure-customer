import type { RefObject } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { styles } from "./OtpInput.styles";

const OTP_LENGTH = 6;
const INPUT_MAX_LENGTH = OTP_LENGTH + 1;

interface OtpInputProps {
  slots: string[];
  inputValue: string;
  otpError: string;
  error: string | null;
  loading: boolean;
  resendCooldown: number;
  activeIndex: number;
  inputRef: RefObject<TextInput | null>;
  onBoxPress: (index: number) => void;
  onOtpChange: (value: string) => void;
  onResend: () => void;
}

export function OtpInput({
  slots,
  inputValue,
  otpError,
  error,
  loading,
  resendCooldown,
  activeIndex,
  inputRef,
  onBoxPress,
  onOtpChange,
  onResend,
}: OtpInputProps) {
  // Red borders only paint once there are digits to flag — on an empty,
  // just-cleared row it would hide the active-box highlight instead.
  const showError = !!(otpError || error) && slots.some(Boolean);

  return (
    <View>
      {/* Plain View, not Pressable — a parent Pressable competes with the
          per-box Pressables for the touch responder on Android and wins,
          so box taps stop firing. The invisible TextInput just holds the
          value and drives the OS keyboard. */}
      <View style={styles.boxRow}>
        {[...Array(OTP_LENGTH)].map((_, index) => {
          const isActive = index === activeIndex;
          const isFilled = !!slots[index];
          return (
            <Pressable
              key={index}
              onPress={() => onBoxPress(index)}
              style={[
                styles.otpBox,
                (isActive || showError) && styles.boxBorderThick,
                showError
                  ? styles.boxError
                  : isActive || isFilled
                    ? styles.boxAccent
                    : styles.boxIdle,
                isActive && styles.boxFillActive,
              ]}
            >
              {isFilled ? (
                <Text style={styles.otpDigit}>{slots[index]}</Text>
              ) : null}
            </Pressable>
          );
        })}

        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={onOtpChange}
          keyboardType="number-pad"
          maxLength={INPUT_MAX_LENGTH}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          accessibilityLabel="OTP code"
          caretHidden
          selectionColor="transparent"
          contextMenuHidden
          autoCorrect={false}
          spellCheck={false}
          style={styles.hiddenInput}
        />
      </View>

      {otpError || error ? (
        <Text style={styles.error}>{otpError || error}</Text>
      ) : null}

      <View style={styles.resendRow}>
        {resendCooldown > 0 ? (
          <Text style={styles.resendText}>
            Resend OTP in{" "}
            <Text style={styles.resendHighlight}>{resendCooldown}s</Text>
          </Text>
        ) : (
          <Pressable
            onPress={onResend}
            disabled={loading}
            hitSlop={{ top: 16, bottom: 16, left: 24, right: 24 }}
            accessibilityRole="button"
            accessibilityLabel="Resend OTP"
          >
            <Text style={styles.resendLink}>Resend OTP</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
