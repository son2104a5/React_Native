import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Employee } from "../interfaces/employee.interface";
import api from "../services/api";

type Props = {
  initial?: Partial<Employee>;
  onSuccess: () => void;
  mode: "add" | "edit";
  id?: string;
};

export default function EmployeeForm({ initial = {}, onSuccess, mode, id }: Props) {
  const [fullName, setFullName] = useState(initial.fullName || "");
  const [email, setEmail] = useState(initial.email || "");
  const [positionId, setPositionId] = useState(initial.positionId || "");
  const [phone, setPhone] = useState(initial.phone || "");

  const handleSubmit = async () => {
    if (!fullName.trim()) return Alert.alert("Lỗi", "Họ tên không được để trống");

    const payload = { fullName, email, positionId, phone };

    try {
      if (mode === "add") {
        await api.post("/employees", payload);
        Alert.alert("Thành công", "Thêm nhân viên thành công");
      } else {
        await api.put(`/employees/${id}`, payload);
        Alert.alert("Thành công", "Cập nhật nhân viên thành công");
      }
      onSuccess();
    } catch (err: any) {
      Alert.alert("Lỗi", err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Họ và tên</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text>Số điện thoại</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text>Vị trí (id)</Text>
      <TextInput style={styles.input} value={positionId} onChangeText={setPositionId} />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>{mode === "add" ? "Thêm nhân viên" : "Cập nhật"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 12 },
  btn: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, marginTop: 8 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
