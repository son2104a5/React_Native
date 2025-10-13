import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface Task {
  id: number;
  name: string;
}

interface PropTypes {
  task: Task;
  onDelete: (id: number) => void;
}

export default function Ex7({ task, onDelete }: PropTypes) {
  return (
    <>
      <View key={task.id} style={styles.taskItem}>
        <Text>{task.name}</Text>
        <View>
          <Button
            onPress={() => onDelete(task.id)}
            title="Xóa"
            color={"red"}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    taskItem: {
        borderWidth: 1,
        borderColor: "#dadada",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    }
});