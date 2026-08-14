const DIGITS_ONLY = /[^0-9]/g;
const INDIAN_MOBILE = /^[6-9][0-9]{9}$/;
const OTP_PATTERN = /^\d{6}$/;

// Pasted numbers usually carry a +91 or a leading 0 — drop the prefix rather
// than slicing the first 10 digits, which would keep "91" and lose the tail.
export function sanitizePhone(raw: string): string {
  let digits = raw.replace(DIGITS_ONLY, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length > 10 && digits.startsWith("0"))
    digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** Returns an error message, or "" when valid. */
export function validatePhone(value: string): string {
  if (!value) return "Please enter your mobile number";
  if (value.length < 10 || !INDIAN_MOBILE.test(value)) {
    return "Please enter a valid 10-digit mobile number";
  }
  return "";
}

/** Returns an error message, or "" when valid. */
export function validateOtp(value: string): string {
  if (!value || value.length < 6) return "Enter the 6-digit OTP";
  if (!OTP_PATTERN.test(value)) return "OTP must contain digits only";
  return "";
}
