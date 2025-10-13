import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  productId: string;
  name: string;
  quantity: number;
};

const PRODUCTS = [
  { productId: "a1", name: "Laptop" },
  { productId: "b2", name: "Điện thoại" },
  { productId: "c3", name: "Tai nghe" },
];

const Ex7 = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.log("Lỗi load giỏ hàng", e);
    }
  };

  const saveCart = async (newCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } catch (e) {
      console.log("Lỗi lưu giỏ hàng", e);
    }
  };

  const addToCart = async (product: { productId: string; name: string }) => {
    let updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (item) => item.productId === product.productId
    );

    if (index >= 0) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    await saveCart(updatedCart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Danh sách sản phẩm</Text>
      {PRODUCTS.map((p) => (
        <View
          key={p.productId}
          style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}
        >
          <Text>{p.name}</Text>
          <Button title="Thêm vào giỏ" onPress={() => addToCart(p)} />
        </View>
      ))}

      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <Text>
            {item.name} - SL: {item.quantity}
          </Text>
        )}
      />
    </View>
  );
};

export default Ex7;
