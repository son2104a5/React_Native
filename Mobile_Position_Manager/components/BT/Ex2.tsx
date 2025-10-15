import { generateRandom } from "@/redux/slices/random.slice";
import { RootState } from "@/redux/store";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const Ex2 = () => {
  const numbers = useSelector((state: RootState) => state.random.numbers);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách số ngẫu nhiên</Text>

      <View style={styles.box}>
        <Text style={styles.numberText}>
          {numbers.length > 0 ? `[${numbers.join(", ")}]` : " "}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(generateRandom())}>
        <Text style={styles.btnText}>Tạo số</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ex2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  numberText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
