import { makeMutable } from "react-native-reanimated";

/**
 * Global tab bar visibility: 1 = shown, 0 = hidden.
 *
 * Module-level rather than a hook's `useSharedValue` — the scroll handler
 * (a screen) and the tab bar (the tabs layout) live in different component
 * trees and must share one instance. Writing it from the scroll worklet
 * keeps the whole hide/show animation on the UI thread.
 */
export const tabBarVisible = makeMutable(1);
