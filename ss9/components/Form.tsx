import { PhoneContext } from "@/context/PhoneBookContext";
import { Phone } from "@/interfaces/phone.interface";
import React, { useContext, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const dimensions = Dimensions.get("window");

export default function Form() {
  // Lấy dữ liệu từ context
  const { isShowForm, onCloseForm, onAddPhoneBook } = useContext(PhoneContext);

  const [phone, setPhone] = useState<Phone>({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const handleSubmit = () => {
    // Gọi hàm để truyền dữ liệu lên context
    onAddPhoneBook?.({
      id: "123",
      fullName: phone.fullName,
      phoneNumber: phone.phoneNumber,
      email: phone.email,
    });
  };

  return (
    isShowForm && (
      <View style={styles.overlay}>
        <View style={styles.form}>
          <View style={styles.headerForm}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Thêm mới liên hệ
            </Text>
            <Button title="Đóng" onPress={onCloseForm} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => {
                setPhone({ ...phone, fullName: text });
              }}
              style={styles.input}
              placeholder="Tên"
            />
            <TextInput
              onChangeText={(text) => {
                setPhone({ ...phone, phoneNumber: text });
              }}
              style={styles.input}
              placeholder="Số điện thoại"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={(text) => {
                setPhone({ ...phone, email: text });
              }}
              style={styles.input}
              placeholder="Email (không bắt buộc)"
            />
            <Button title="Lưu" onPress={handleSubmit}/>
            <Button color={"red"} title="Xóa liên hệ" />
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: dimensions.height,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    display: "flex",
    width: 350,
  },
  headerForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: 300,
  },
  inputContainer: {
    marginTop: 16,
    display: "flex",
    gap: 8,
  },
});
