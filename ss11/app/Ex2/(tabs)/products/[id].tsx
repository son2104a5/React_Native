import { useLocalSearchParams } from "expo-router";
import React from "react";
import { products } from ".";
import { StyleSheet, Text, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const findProduct = products.find((item) => item.id.toString() === id);
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>Tên sản phẩm</Text>
        <Text style={{
            fontSize: 32,
            fontWeight: "bold",
        }}>{findProduct?.name}</Text>
      </View>
      <View>
        <Text style={styles.title}>Giá tiền</Text>
        <Text style={{
            fontSize: 24,
            fontWeight: "600",
            color: '#ffd500ff'
        }}>{findProduct?.price.toLocaleString()} VND</Text>
      </View>
      <View>
        <Text style={styles.title}>Trạng thái</Text>
        <Text>{findProduct?.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "#b4b4b4",
  },
  item: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    display: "flex",
    gap: 20,
  },
});
