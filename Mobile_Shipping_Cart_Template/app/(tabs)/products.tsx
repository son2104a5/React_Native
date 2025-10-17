import { addToCart } from "@/apis/cart.api";
import { useProductList } from "@/hooks/queries/useProductList";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

type ProductCardProps = {
  item: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  
  const handleAddToCart = (id: string) => {
    addToCart(id)
    router.push("/cart")
  }
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        onPress={() =>
          router.push({
            pathname: "/product-detail",
            params: { id: item.id },
          })
        }
        style={styles.title}
        numberOfLines={2}
      >
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price.toLocaleString("vi-VN")} VNĐ</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item.id)} // Chuyển hướng qua trang giỏ hàng khi nhấn
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProductsScreen() {
  const { data: products, isLoading, isError, error } = useProductList();
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Cửa hàng" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContainer: { padding: 8 },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: "100%", height: 120, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "600", textAlign: "center", height: 40 },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53e3e",
    marginVertical: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
});
