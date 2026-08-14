import * as Application from "expo-application";
import { Platform } from "react-native";

import { apiClient } from "@/api";

const ENDPOINTS = {
  requestOtp: "/api/v1/customers/auth/request-otp",
  verifyOtp: "/api/v1/customers/auth/verify-otp",
  logout: "/api/v1/customers/auth/logout",
};

interface RequestOtpResponse {
  data: { otp?: string };
}

interface VerifyOtpResponse {
  data: { accessToken: string; expiresIn: number };
}

// Stable per-install id the backend requires on verify-otp — not the old
// app's full device-info payload, since nothing else here needs one yet.
async function getDeviceId(): Promise<string> {
  try {
    const id =
      Platform.OS === "ios"
        ? await Application.getIosIdForVendorAsync()
        : Application.getAndroidId();
    return id ?? "";
  } catch {
    return "";
  }
}

export const authApi = {
  requestOtp: async (phone: string): Promise<RequestOtpResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.requestOtp, { phone });
    return data;
  },
  verifyOtp: async (
    phone: string,
    otp: string,
  ): Promise<VerifyOtpResponse> => {
    const deviceId = await getDeviceId();
    const { data } = await apiClient.post(ENDPOINTS.verifyOtp, {
      phone,
      otp,
      deviceId,
      platform: "APP",
    });
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post(ENDPOINTS.logout);
    return data;
  },
};
