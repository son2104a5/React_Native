import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";

export default function PositionLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Danh sách vị trí",
          headerRight: () => (
            <Ionicons
              name="add-circle"
              size={30}
              color="green"
              style={{ marginRight: 10 }}
              onPress={() => router.push("/BT/(tabs)/positions/add")}
            />
          ),
        }}
      />
      <Stack.Screen name="add" options={{ title: "Thêm vị trí" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Chỉnh sửa vị trí" }} />
    </Stack>
  );
}
