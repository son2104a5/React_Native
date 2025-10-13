import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface Product {
  id: string;
  name: string;
  price: number;
}

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductItem({ product, onAddToCart }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>
          {product.price.toLocaleString("vi-VN")}đ
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onAddToCart(product)}
      >
        <Text style={styles.buttonText}>THÊM VÀO GIỎ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#555", marginTop: 4 },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
