import { ProductStatus } from "@/enums/ProductStatus";
import { Product } from "@/interfaces/product.interface";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    status: ProductStatus.ON_SALE,
    price: 10000000,
  },
  {
    id: 2,
    name: "Product 2",
    status: ProductStatus.NOT_YET_SOLD,
    price: 20000000,
  },
  {
    id: 3,
    name: "Product 3",
    status: ProductStatus.SOLD_OUT,
    price: 30000000,
  },
  {
    id: 4,
    name: "Product 4",
    status: ProductStatus.NOT_YET_SOLD,
    price: 40000000,
  },
  {
    id: 5,
    name: "Product 5",
    status: ProductStatus.ON_SALE,
    price: 50000000,
  },
];

export default function ProductList() {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/Ex2/(tabs)/products/[id]",
                params: { id: item.id.toString() },
              })
            }
          >
            <View style={{ display: "flex", gap: 6 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {item.price.toLocaleString()} VND
              </Text>
              <Text
                style={{
                  color:
                    item.status === ProductStatus.NOT_YET_SOLD
                      ? "gray"
                      : item.status === ProductStatus.ON_SALE
                      ? "green"
                      : "red",
                  borderColor:
                    item.status === ProductStatus.NOT_YET_SOLD
                      ? "gray"
                      : item.status === ProductStatus.ON_SALE
                      ? "green"
                      : "red",
                  borderWidth: 1,
                  paddingVertical: 6,
                  textAlign: "center",
                  borderRadius: 16,
                }}
              >
                {item.status === ProductStatus.NOT_YET_SOLD
                  ? "Chưa bán"
                  : item.status === ProductStatus.ON_SALE
                  ? "Đang bán"
                  : "Hết hàng"}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Feather name="edit-3" size={24} color="#436fffff" />
              <Feather name="trash-2" size={24} color="red" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
  },
  price: {
    color: "#aaaaaaff",
  },
});
