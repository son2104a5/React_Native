import React from "react";
import { Dimensions, Text, View } from "react-native";

const dimensions = Dimensions.get("window");

export default function HomePage() {
  return (
    <View style={{ height: dimensions.height - 150 }}>
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          height: "100%",
        }}
      >
        Trang chủ
      </Text>
    </View>
  );
}
