import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function FeedDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chi tiết bài viết có ID:</Text>
      <Text style={styles.id}>{id}</Text>
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  id: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
  },
});
