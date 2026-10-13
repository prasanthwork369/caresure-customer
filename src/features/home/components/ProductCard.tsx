import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";

import type { Product } from "../types";
import { styles } from "./ProductCard.styles";

const CARD_WIDTH = 148;
const IMAGE_HEIGHT = 110;

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

// Add-to-cart is a visual stub — the Cart feature (mutations, quantity
// state) doesn't exist yet; wiring it here would be dead/fake state.
export const ProductCard = memo(function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={() => onPress(product)}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={product.name}
    >
      <View style={styles.imageWrap}>
        {product.discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        ) : null}
        {product.image ? (
          <Image
            source={product.image}
            style={styles.image}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
          {product.originalPrice && product.originalPrice > product.price ? (
            <Text style={styles.mrp}>₹{product.originalPrice.toFixed(2)}</Text>
          ) : null}
        </View>

        <View style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </View>
      </View>
    </Pressable>
  );
});

export { CARD_WIDTH, IMAGE_HEIGHT };
