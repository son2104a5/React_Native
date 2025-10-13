import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const Ex4: React.FC = () => {
  const netInfo = useNetInfo();

  return (
    <View style={styles.container}>
      {!netInfo.isConnected && (
        <View style={styles.offlineBar}>
          <Text style={styles.offlineText}>⚠️ Mất kết nối mạng</Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.title}>Trạng thái mạng</Text>
        <Text>isConnected: {netInfo.isConnected ? "Có" : "Không"}</Text>
        <Text>Loại kết nối: {netInfo.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  offlineBar: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "white",
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default Ex4;
