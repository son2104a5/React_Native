import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { useUpdatePosition } from "@/hooks/queries/useUpdatePosition";
import { usePositionDetails } from "@/hooks/queries/usePositionDetail";

export default function EditPositionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const positionId = Number(id);

  const { data: position, isLoading } = usePositionDetails(positionId);
  const { mutate } = useUpdatePosition();

  const handleUpdatePosition = (data: any) => {
    mutate({ ...position, ...data });
    if (router.canGoBack()) router.back();
  };

  if (isLoading) return <ActivityIndicator size="large" />;
  if (!position)
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  return (
    <ScrollView style={styles.container}>
      <PositionForm
        onSubmit={handleUpdatePosition}
        initialValues={{
          positionName: position.positionName,
          description: position.description,
          positionStatus: position.positionStatus,
        }}
        submitButtonText="Cập nhật"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, color: "red" },
});
