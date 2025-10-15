import { setGridMode, setListMode } from "@/redux/slices/mode.slice";
import { RootState } from "@/redux/store";
import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Ex3: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.viewMode.mode);

  const items = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="List mode" onPress={() => dispatch(setListMode())} />
        <Button title="Grid mode" onPress={() => dispatch(setGridMode())} />
      </View>
      <View style={[styles.container, mode === "grid" && styles.grid]}>
        {items.map((num) => (
          <View
            key={num}
            style={[styles.item, mode === "grid" && styles.gridItem]}
          >
            <Text style={styles.text}>{num}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  item: {
    backgroundColor: "tomato",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  gridItem: {
    width: "45%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Ex3;
