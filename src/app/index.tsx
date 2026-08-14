import { Redirect } from "expo-router";

import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isGuest = useAuthStore((s) => s.isGuest);
  const isLoaded = useAuthStore((s) => s.isLoaded);

  if (!isLoaded) return null;
  return (
    <Redirect href={isAuthenticated || isGuest ? "/(tabs)" : "/(auth)/login"} />
  );
}
