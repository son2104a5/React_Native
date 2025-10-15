import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { decrease, increase } from "@/redux/slices/counter.slice";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Ex1() {
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
      <Text style={{ fontSize: 30, fontWeight: 500 }}>
        Counter: {result.value}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button title="Decrease" onPress={handleDecrease} />
        <Button title="Increase" onPress={handleIncrease} />
      </View>
    </View>
  );
}
