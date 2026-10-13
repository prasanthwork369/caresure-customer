import { memo } from "react";
import { FlatList, Text, View } from "react-native";

import type { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { styles } from "./ProductRail.styles";

interface ProductRailProps {
  title: string;
  products: Product[];
  onProductPress: (product: Product) => void;
}

export const ProductRail = memo(function ProductRail({
  title,
  products,
  onProductPress,
}: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={onProductPress} />
        )}
      />
    </View>
  );
});
