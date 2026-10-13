import SearchIcon from "@/assets/icons/search.svg";
import { memo } from "react";
import { Pressable, Text } from "react-native";

import { styles } from "./SearchBar.styles";

interface SearchBarProps {
  onPress: () => void;
}

export const SearchBar = memo(function SearchBar({ onPress }: SearchBarProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      accessibilityRole="search"
      accessibilityLabel="Search medicines & health products"
    >
      <SearchIcon width={20} height={20} />
      <Text style={styles.placeholder} numberOfLines={1}>
        Search medicines & health products
      </Text>
    </Pressable>
  );
});
