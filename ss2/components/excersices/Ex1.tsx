import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BusinessCard = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://fastly.picsum.photos/id/464/100/100.jpg?hmac=sh_hhH9BJxL19pcPLrYmV_A22Lmoosrb_cD9Pox1kCk" }} // ảnh random
        style={styles.avatar}
      />
      <Text style={styles.name}>Nguyễn Văn A</Text>
      <Text style={styles.description}>
        Fullstack Developer | UX/UI Enthusiast
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",

    // Đổ bóng cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    // Đổ bóng cho Android
    elevation: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});

export default BusinessCard;
