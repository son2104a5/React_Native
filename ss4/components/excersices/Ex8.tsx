import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ProductItem, { Product } from "./ProductItem";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ShopScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: "1", name: "iPhone 15 Pro", price: 25000000 },
    { id: "2", name: "MacBook Air M3", price: 32000000 },
    { id: "3", name: "Apple Watch Series 9", price: 11000000 },
    { id: "4", name: "AirPods Pro 2", price: 6000000 },
  ];

  // ✅ Xử lý thêm vào giỏ
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // ✅ Tổng số lượng hàng trong giỏ
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.cartText}>Số mặt hàng trong giỏ: {totalItems}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={addToCart} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  cartText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
});
