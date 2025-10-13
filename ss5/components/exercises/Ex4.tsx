import React, { use, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Ex4() {
  const [like, setLike] = useState({
    content: "Thích",
    color: "gray",
  });

  const handlePress = () => {
    if (like.content == "Thích") {
      setLike({ content: "Đã thích", color: "#007bff" });
    } else {
      setLike({ content: "Thích", color: "gray" });
    }
  };
  return (
    <View>
      <Pressable onPress={() => handlePress()}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
            color: like.color,
          }}
        >
          {like.content}
        </Text>
      </Pressable>
    </View>
  );
}
