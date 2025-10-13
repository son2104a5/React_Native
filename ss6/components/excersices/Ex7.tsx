import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from "react-native";

// Kiểu dữ liệu sản phẩm
interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

// Giả lập API fetch sản phẩm
const fetchProducts = (page: number = 1, limit: number = 5): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProducts: Product[] = Array.from({ length: limit }, (_, i) => {
        const id = (page - 1) * limit + i + 1;
        return {
          id: id.toString(),
          name: `Sản phẩm ${id}`,
          price: `${(Math.random() * 100).toFixed(2)} USD`,
          description: `Mô tả ngắn cho sản phẩm ${id}`,
        };
      });
      resolve(newProducts);
    }, 1500); // giả lập delay API
  });
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (loadingMore) return; // tránh load nhiều lần cùng lúc
    setLoadingMore(true);
    const newProducts = await fetchProducts(page);
    setProducts((prev) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
    setLoadingMore(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Danh sách sản phẩm ({products.length})
      </Text>
    </View>
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text> Đang tải thêm...</Text>
      </View>
    ) : null;

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      onEndReached={loadProducts}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: "#eee",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "green",
  },
  desc: {
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
