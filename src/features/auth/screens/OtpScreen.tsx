import ArrowForwardWhiteIcon from "@/assets/icons/arrow_forward_white.svg";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { colors } from "@/theme";

import { AuthFooter } from "../components/AuthFooter";
import { AuthScreenShell } from "../components/AuthScreenShell";
import { OtpInput } from "../components/OtpInput";
import { useOtp } from "../hooks/useOtp";
import { styles } from "./OtpScreen.styles";

// "+919876543210" -> "+91 98765 43210"
function formatPhoneForDisplay(rawPhone: string): string {
  if (!rawPhone) return "";
  const cleaned = rawPhone.replace(/\s+/g, "");
  if (cleaned.startsWith("+91") && cleaned.length === 13) {
    return `+91 ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
  }
  return rawPhone;
}

export function OtpScreen() {
  const router = useRouter();
  const {
    phone,
    slots,
    inputValue,
    otpError,
    error,
    resendCooldown,
    isButtonLoading,
    isValid,
    inputRef,
    activeIndex,
    handleBoxPress,
    handleResend,
    handleOtpChange,
    handleVerify,
  } = useOtp();
  const disabled = isButtonLoading || !isValid;

  return (
    <AuthScreenShell footer={<AuthFooter />}>
      <Text style={styles.title}>Verify OTP</Text>
      <View style={styles.phoneRow}>
        <Text style={styles.phone}>{formatPhoneForDisplay(phone)}</Text>
        <Pressable
          onPress={() => router.back()}
          style={styles.editButton}
          accessibilityRole="button"
          accessibilityLabel="Edit phone number"
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      </View>

      <OtpInput
        slots={slots}
        inputValue={inputValue}
        otpError={otpError}
        error={error}
        loading={isButtonLoading}
        resendCooldown={resendCooldown}
        activeIndex={activeIndex}
        inputRef={inputRef}
        onBoxPress={handleBoxPress}
        onOtpChange={handleOtpChange}
        onResend={handleResend}
      />

      <Pressable
        onPress={() => handleVerify()}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Verify and continue"
        accessibilityState={{ disabled, busy: isButtonLoading }}
        style={[styles.verifyButton, disabled && styles.verifyButtonDisabled]}
      >
        {isButtonLoading ? (
          <ActivityIndicator color={colors.text.inverse} size="small" />
        ) : (
          <>
            <Text style={styles.verifyButtonText}>Verify & Continue</Text>
            <ArrowForwardWhiteIcon width={13} height={13} />
          </>
        )}
      </Pressable>
    </AuthScreenShell>
  );
}
