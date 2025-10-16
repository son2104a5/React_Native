import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { useCreatePosition } from "@/hooks/queries/useCreatePosition";
import { Position } from "../../../types";

export default function AddPositionScreen() {
  const router = useRouter();
  const { mutate } = useCreatePosition();

  const handleAddPosition = (data: Omit<Position, "id" | "createdAt">) => {
    mutate(data);
    if (router.canGoBack()) router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <PositionForm
        onSubmit={handleAddPosition}
        submitButtonText="Thêm vị trí"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
