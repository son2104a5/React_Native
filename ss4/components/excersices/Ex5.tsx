// App.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CurrencyInput from "./CurrentcyInput";

export default function App() {
  const [vnd, setVnd] = useState("0");
  const [usd, setUsd] = useState("0");

  const RATE = 25000; // 1 USD = 25,000 VND

  const handleVndChange = (val: any) => {
    const vndValue = parseFloat(val) || 0;
    setVnd(val);
    setUsd((vndValue / RATE).toFixed(2).toString());
  };

  const handleUsdChange = (val: any) => {
    const usdValue = parseFloat(val) || 0;
    setUsd(val);
    setVnd((usdValue * RATE).toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chuyển đổi tiền tệ</Text>
      <CurrencyInput label="Số tiền (VND)" value={vnd} onChange={handleVndChange} />
      <CurrencyInput label="Số tiền (USD)" value={usd} onChange={handleUsdChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
