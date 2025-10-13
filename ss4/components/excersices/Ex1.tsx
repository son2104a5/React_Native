import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UserInfoCard from "@/components/excersices/UserInfoCard";

const UserListScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>

      {/* Gọi component UserInfoCard 2 lần */}
      <UserInfoCard
        name="Trần Văn An"
        email="tran.an@example.com"
        avatarUrl="https://i.pravatar.cc/150?u=1"
      />
      <UserInfoCard
        name="Lý Thị Bình"
        email="ly.binh@example.com"
        avatarUrl="https://i.pravatar.cc/150?u=2"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default UserListScreen;
