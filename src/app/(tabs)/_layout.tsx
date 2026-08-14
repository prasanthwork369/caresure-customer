// The `Tabs` re-exported from bare "expo-router" is flagged deprecated in
// this SDK 57 build in favor of "expo-router/js-tabs" — same component,
// current import path.
import { Tabs, type BottomTabBarProps } from "expo-router/js-tabs";

import { tabScreenOptions, TabBar } from "@/navigation";

// The navigator calls `options.tabBar(props)` as a plain function, not via
// JSX — passing TabBar directly would run its body (and its
// useSafeAreaInsets() hook) outside any React fiber and throw "Invalid hook
// call". Wrapping it so the call only constructs a <TabBar /> element lets
// React mount it normally. Hoisted so the tab bar isn't remounted by a fresh
// closure on every render.
const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions} tabBar={renderTabBar}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="categories" options={{ title: "Categories" }} />
      <Tabs.Screen name="prescription" options={{ title: "Prescription" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
