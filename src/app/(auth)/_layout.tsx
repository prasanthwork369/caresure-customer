import { Stack } from "expo-router";

import { screenTransitions } from "@/navigation";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, ...screenTransitions.push }}>
      <Stack.Screen name="login" options={screenTransitions.fade} />
      <Stack.Screen name="otp" options={screenTransitions.fade} />
    </Stack>
  );
}
