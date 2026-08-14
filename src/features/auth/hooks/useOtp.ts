import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, type TextInput } from "react-native";

import { useAuthStore } from "@/store/authStore";

import { authApi } from "../api/auth.api";
import { validateOtp } from "../utils";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

const emptySlots = () => Array<string>(OTP_LENGTH).fill("");

// Index of the first differing char — finds the digit the keyboard just inserted.
const firstDiff = (a: string, b: string) => {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return i;
};

export function useOtp() {
  const router = useRouter();
  const { phone, prefillOtp } = useLocalSearchParams<{
    phone: string;
    prefillOtp?: string;
  }>();
  const login = useAuthStore((s) => s.login);

  const hasPrefill = !!prefillOtp && prefillOtp.length === OTP_LENGTH;
  const [slots, setSlots] = useState<string[]>(() =>
    hasPrefill ? prefillOtp!.split("") : emptySlots(),
  );
  const [activeSlot, setActiveSlot] = useState(() =>
    hasPrefill ? OTP_LENGTH - 1 : 0,
  );
  // A tapped box means the user is correcting — don't auto-submit then.
  const isEditingRef = useRef(false);
  const inputRef = useRef<TextInput | null>(null);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(
    RESEND_COOLDOWN_SECONDS,
  );
  const [isRedirecting, setIsRedirecting] = useState(false);
  // Ref, not state: two taps in the same tick both read a stale `false`.
  const verifyLockRef = useRef(false);

  const inputValue = slots.filter(Boolean).join("");
  const code = slots.join("");

  const verifyMutation = useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) =>
      authApi.verifyOtp(phone, otp),
  });
  const resendMutation = useMutation({
    mutationFn: (phone: string) => authApi.requestOtp(phone),
  });

  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  const resetOtp = () => {
    setSlots(emptySlots());
    setActiveSlot(0);
    isEditingRef.current = false;
    requestAnimationFrame(() => inputRef.current?.clear());
  };

  const handleResend = async () => {
    if (!phone || resendCooldown > 0) return;
    try {
      const res = await resendMutation.mutateAsync(phone);
      const newPrefill = __DEV__ ? (res.data.otp ?? "") : "";
      if (newPrefill && newPrefill.length === OTP_LENGTH) {
        setOtpError("");
        setSlots(newPrefill.split(""));
        setActiveSlot(OTP_LENGTH - 1);
        isEditingRef.current = false;
        inputRef.current?.blur();
      } else {
        resetOtp();
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      // Error surfaced via resendMutation.error below.
    }
  };

  const handleBoxPress = (index: number) => {
    isEditingRef.current = true;
    setActiveSlot(index);
    const input = inputRef.current;
    if (!input) return;
    if (Keyboard.isVisible()) {
      input.focus();
    } else {
      input.blur();
      requestAnimationFrame(() => input.focus());
    }
  };

  const handleVerify = async (codeArg?: string) => {
    if (verifyLockRef.current || verifyMutation.isPending || isRedirecting) {
      return;
    }
    const otpCode = codeArg ?? code;
    const validationError = validateOtp(otpCode);
    if (validationError) {
      setOtpError(validationError);
      return;
    }
    if (!phone) return;

    // Not released on success: the screen is navigating away and a late
    // tap must not verify again.
    verifyLockRef.current = true;
    try {
      const result = await verifyMutation.mutateAsync({ phone, otp: otpCode });
      Keyboard.dismiss();
      setIsRedirecting(true);
      await login(result.data.accessToken);
      router.replace("/(tabs)");
    } catch {
      // Released here only: a wrong/expired code must leave the user able
      // to retype and try again.
      verifyLockRef.current = false;
      resetOtp();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  /** Input text is only a signal: longer = typed, shorter = backspace; edits land on activeSlot. */
  const handleOtpChange = (value: string) => {
    setOtpError("");
    const digits = value.replace(/\D/g, "");
    const prev = inputValue;
    const next = [...slots];

    // A whole code at once (paste) fills every box.
    if (digits.length === OTP_LENGTH && prev.length === 0) {
      setSlots(digits.split(""));
      setActiveSlot(OTP_LENGTH - 1);
      if (!isEditingRef.current) {
        inputRef.current?.blur();
        handleVerify(digits);
      }
      return;
    }

    if (digits.length < prev.length) {
      let slot = activeSlot;
      if (!next[slot]) {
        let prior = slot - 1;
        while (prior >= 0 && !next[prior]) prior--;
        if (prior < 0) return;
        slot = prior;
      }
      next[slot] = "";
      setSlots(next);
      setActiveSlot(slot);
      return;
    }

    if (digits.length > prev.length) {
      // A full code only changes after a tap, so stray keys can't corrupt a prefilled code.
      if (!isEditingRef.current && next.every((d) => d !== "")) return;

      const at = firstDiff(prev, digits);
      const added = digits.slice(at, at + (digits.length - prev.length));
      let slot = activeSlot;
      for (const digit of added) {
        if (slot >= OTP_LENGTH) break;
        next[slot] = digit;
        slot += 1;
      }
      setSlots(next);
      setActiveSlot(Math.min(slot, OTP_LENGTH - 1));

      // Auto-submit only when freshly completed by typing, not while correcting.
      if (next.every((d) => d !== "") && !isEditingRef.current) {
        inputRef.current?.blur();
        handleVerify(next.join(""));
      }
    }
  };

  const activeIndex = Math.min(activeSlot, OTP_LENGTH - 1);
  const isValid = !validateOtp(code);
  const isButtonLoading = verifyMutation.isPending || isRedirecting;
  const error =
    verifyMutation.error?.message ?? resendMutation.error?.message ?? null;

  return {
    phone: phone ?? "",
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
  };
}
