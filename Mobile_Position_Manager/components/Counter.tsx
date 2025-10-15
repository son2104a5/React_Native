import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { decrease, increase } from "@/redux/slices/counter.slice";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Counter() {
  // Lấy dữ liệu từ trong store
  const result = useAppSelector((state) => state.counter);

  // Bắn dispatch để gọi phương thức trong slice
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    // dispatch từ component vào trong reducer (slice)
    dispatch(increase());
  };
  const handleDecrease = () => {
    dispatch(decrease());
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, flexDirection: 'row', gap: 5 }}>
      <Button title="Decrease" onPress={handleDecrease} />
      <Text style={{ fontSize: 30, fontWeight: 500 }}>
        Counter: {result.value}
      </Text>
      <Button title="Increase" onPress={handleIncrease} />
    </View>
  );
}
