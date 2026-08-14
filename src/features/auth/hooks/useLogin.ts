import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, type TextInput } from "react-native";

import { authApi } from "../api/auth.api";
import { sanitizePhone, validatePhone } from "../utils";

export function useLogin() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const phoneInputRef = useRef<TextInput | null>(null);

  const requestOtpMutation = useMutation({
    mutationFn: (phone: string) => authApi.requestOtp(phone),
  });

  const handleChangeText = (text: string) => {
    // Typed overflow: already 10 digits and new text only appends — ignore it.
    if (phoneNumber.length === 10 && text.startsWith(phoneNumber)) return;
    if (requestOtpMutation.error) requestOtpMutation.reset();
    const cleaned = sanitizePhone(text);
    setPhoneNumber(cleaned);
    setPhoneError(cleaned ? validatePhone(cleaned) : "");
  };

  const handleGetOtp = async () => {
    const validationError = validatePhone(phoneNumber);
    if (validationError) {
      setPhoneError(validationError);
      return;
    }
    Keyboard.dismiss();
    try {
      const formattedPhone = `+91${phoneNumber}`;
      const res = await requestOtpMutation.mutateAsync(formattedPhone);
      // Dev-only QA convenience — never present against a release build.
      const prefillOtp = __DEV__ ? (res.data.otp ?? "") : "";
      router.push({
        pathname: "/otp",
        params: { phone: formattedPhone, prefillOtp },
      });
    } catch {
      // Error surfaced via requestOtpMutation.error below.
    }
  };

  const isValid = !validatePhone(phoneNumber);

  return {
    phoneNumber,
    phoneError,
    loading: requestOtpMutation.isPending,
    error: requestOtpMutation.error?.message ?? null,
    isValid,
    phoneInputRef,
    handleChangeText,
    handleGetOtp,
  };
}
