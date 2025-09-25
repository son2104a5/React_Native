import { COLORS, CONTAINER_STYLES, FONT_SIZES, SPACING } from '@/styles/GlobalStyles';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreenRefactor() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={CONTAINER_STYLES.default}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://rikkei.edu.vn/wp-content/uploads/2024/01/logo-rikkei.png' }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Ô nhập tên đăng nhập */}
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />

      {/* Ô nhập mật khẩu */}
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 110,
    marginBottom: SPACING.lg,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
});
