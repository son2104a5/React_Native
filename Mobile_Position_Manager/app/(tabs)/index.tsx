import Ex1 from "@/components/BT/Ex1";
import Ex2 from "@/components/BT/Ex2";
import Ex3 from "@/components/BT/Ex3";
import Ex4 from "@/components/BT/Ex4/Screen";
import Ex5 from "@/components/BT/Ex5";
import Counter from "@/components/Counter";
import Random from "@/components/Random";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.content}>
        <FontAwesome5 name="home" size={80} color="#3182CE" />
        <Text style={styles.title}>Trang chủ</Text>
        <Text style={styles.subtitle}>
          Chào mừng bạn đến với ứng dụng quản lý!
        </Text>
        <Text style={styles.instructions}>
          Chọn một tab bên dưới để bắt đầu.
        </Text>
      </View>  */}
      {/* <Counter /> */}
      {/* <Random />  */}
      {/* <Ex1 /> */}
      {/* <Ex2 /> */}
      {/* <Ex3 /> */}
      {/* <Ex4 /> */}
      {/* <Ex5 /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#4A5568",
    textAlign: "center",
    marginTop: 10,
  },
  instructions: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginTop: 40,
    fontStyle: "italic",
  },
});
