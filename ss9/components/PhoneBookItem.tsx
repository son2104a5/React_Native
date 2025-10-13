import { PhoneContext } from "@/context/PhoneBookContext";
import { Phone } from "@/interfaces/phone.interface";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PhoneBookItem({ phone }: { phone: Phone }) {
  const { onOpenForm } = useContext(PhoneContext);

  return (
    <View style={styles.item}>
      <Text>Tên: {phone.fullName}</Text>
      <Text>Sđt: {phone.phoneNumber}</Text>
      {phone.email ? <Text>Email: {phone.email}</Text> : null}
      <Button title="Sửa" onPress={() => onOpenForm?.(phone)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
});
