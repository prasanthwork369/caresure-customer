import ArrowForwardWhiteIcon from "@/assets/icons/arrow_forward_white.svg";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/theme";

import { AuthFooter } from "../components/AuthFooter";
import { AuthScreenShell } from "../components/AuthScreenShell";
import { useLogin } from "../hooks/useLogin";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const {
    phoneNumber,
    phoneError,
    loading,
    error,
    isValid,
    phoneInputRef,
    handleChangeText,
    handleGetOtp,
  } = useLogin();
  const [isFocused, setIsFocused] = useState(false);

  const borderStyle = phoneError
    ? styles.inputWrapError
    : isFocused
      ? styles.inputWrapFocused
      : styles.inputWrapIdle;
  const disabled = loading || !isValid;

  return (
    <AuthScreenShell footer={<AuthFooter />}>
      <Text style={styles.title}>Why pay more for the same medicine?</Text>

      <View style={[styles.inputWrap, borderStyle]}>
        <Text style={styles.prefix}>+91</Text>
        <View style={styles.divider} />
        <TextInput
          ref={phoneInputRef}
          allowFontScaling={false}
          placeholder="Enter your mobile number"
          placeholderTextColor={colors.text.secondary}
          keyboardType="number-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
          accessibilityLabel="Mobile number"
          style={styles.input}
          cursorColor={colors.brand.primary}
          value={phoneNumber}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {phoneError || error ? (
        <Text style={styles.error}>{phoneError || error}</Text>
      ) : null}

      <Pressable
        onPress={handleGetOtp}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Get OTP"
        accessibilityState={{ disabled, busy: loading }}
        style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
      >
        {loading ? (
          <ActivityIndicator color={colors.text.inverse} size="small" />
        ) : (
          <>
            <Text style={styles.submitButtonText}>Get OTP</Text>
            <ArrowForwardWhiteIcon width={13} height={13} />
          </>
        )}
      </Pressable>
    </AuthScreenShell>
  );
}
