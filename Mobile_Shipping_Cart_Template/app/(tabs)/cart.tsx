import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dữ liệu giỏ hàng fix cứng
const CART_ITEMS = [
  {
    id: "1",
    name: "Áo thun Premium Slim Fit",
    price: 350000,
    quantity: 1,
    image:
      "https://product.hstatic.net/200000471735/product/mts215s5-2-w01_3__fabd997abd6841eca0efa71ddaa2319f.jpg",
  },
  {
    id: "2",
    name: "Ổ cứng di động WD 2TB",
    price: 1850000,
    quantity: 2,
    image:
      "https://western.com.vn/media/product/49_hdd_wd_elements_2tb_25_inch_wdbu6y0020bbk__2_.jpg",
  },
  {
    id: "3",
    name: "Vòng tay rồng John Hardy",
    price: 12500000,
    quantity: 1,
    image:
      "https://cdn.xaxi.vn/trangsuc/img/john-hardy-modern-chain-mens-bracelet-bmp9995362dixm.jpg",
  },
];

type CartItemType = (typeof CART_ITEMS)[number];
type CartItemProps = { item: CartItemType };

const CartItem: React.FC<CartItemProps> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image
      source={{ uri: item.image }}
      style={styles.itemImage}
      resizeMode="contain"
    />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.itemPrice}>
        {item.price.toLocaleString("vi-VN")} VNĐ
      </Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity>
          <Ionicons name="remove-circle-outline" size={28} color="#555" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={28} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity>
      <Ionicons name="trash-outline" size={24} color="#e53e3e" />
    </TouchableOpacity>
  </View>
);

const CartSummary = () => (
  <View style={styles.summaryContainer}>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Tạm tính</Text>
      <Text style={styles.summaryValue}>14.700.000 VNĐ</Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
      <TextInput keyboardType="numeric" style={styles.textInput} />
    </View>
    <View style={styles.separator} />
    <View style={styles.summaryRow}>
      <Text style={styles.totalLabel}>Tổng cộng</Text>
      <Text style={styles.totalValue}>14.700.000 VNĐ</Text>
    </View>
  </View>
);

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Giỏ hàng của bạn" }} />
      <FlatList
        data={CART_ITEMS}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<CartSummary />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  // CartItem styles
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#e53e3e" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
  // Summary styles
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 16, fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#e53e3e" },
  // Empty state styles
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: "#888" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 150,
    height: 32,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#333",
  },
});
