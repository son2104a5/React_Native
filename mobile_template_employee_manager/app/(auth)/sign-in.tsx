import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import { authApi } from "../../apis/auth.api";
import { setToken } from "../../utils/storage";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Lỗi", "Nhập email và mật khẩu");
    try {
      const res = await authApi.signIn({ email, password });
      const token = res.data.access_token || res.data.token;
      await setToken(token);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Đăng nhập thất bại", err.response?.data?.message || "Sai thông tin");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>Đăng nhập</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({ container:{ flex:1, justifyContent:"center", padding:16 }, input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:12 }});
