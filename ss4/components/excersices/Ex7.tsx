import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorsState {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({});

  // ✅ Validate từng trường
  const validateField = (fieldName: keyof FormState, value: string) => {
    let errorMsg = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) errorMsg = "Vui lòng nhập họ tên.";
        break;
      case "email":
        const emailRegex = /\S+@\S+\.\S+/;
        if (!value.trim()) errorMsg = "Vui lòng nhập email.";
        else if (!emailRegex.test(value)) errorMsg = "Email không hợp lệ.";
        break;
      case "password":
        if (!value.trim()) errorMsg = "Vui lòng nhập mật khẩu.";
        else if (value.length < 6) errorMsg = "Mật khẩu phải ít nhất 6 ký tự.";
        break;
      case "confirmPassword":
        if (!value.trim()) errorMsg = "Vui lòng xác nhận mật khẩu.";
        else if (value !== form.password) errorMsg = "Mật khẩu không khớp.";
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  // ✅ Khi gõ thì cập nhật state
  const handleChange = (fieldName: keyof FormState, value: string) => {
    setForm({ ...form, [fieldName]: value });
  };

  // ✅ Kiểm tra toàn bộ form có hợp lệ không
  const isFormValid = (): boolean => {
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.password.trim() !== "" &&
      form.confirmPassword.trim() !== "" &&
      Object.values(errors).every((err) => !err)
    );
  };

  // ✅ Submit form
  const handleRegister = () => {
    if (isFormValid()) {
      Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
    } else {
      Alert.alert("Lỗi", "Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo tài khoản</Text>

      {/* Họ tên */}
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Họ và tên"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        onBlur={() => validateField("name", form.name)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* Email */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        onBlur={() => validateField("email", form.email)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Mật khẩu */}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Mật khẩu"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        onBlur={() => validateField("password", form.password)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Xác nhận mật khẩu */}
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        onBlur={() => validateField("confirmPassword", form.confirmPassword)}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/* Nút đăng ký */}
      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
        disabled={!isFormValid()}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  inputError: { borderColor: "red" },
  error: { color: "red", marginBottom: 8 },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#aaa" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
