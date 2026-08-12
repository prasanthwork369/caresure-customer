import { SymbolView } from "expo-symbols";
import { Tabs } from "expo-router";

const ACTIVE_COLOR = "#1D4ED8";
const INACTIVE_COLOR = "#9CA3AF";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "house.fill", android: "home", web: "home" }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "square.grid.2x2.fill",
                android: "grid_view",
                web: "grid_view",
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="prescription"
        options={{
          title: "Prescription",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "pills.fill",
                android: "medication",
                web: "medication",
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "person.fill", android: "person", web: "person" }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
