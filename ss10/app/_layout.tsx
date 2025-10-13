import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerTitleStyle: {
        color: 'red'
    } }}>
        {/* Định nghĩa các route kèm theo các component tương ứng */}
        <Stack.Screen name="index" options={{ title: 'Trang chủ' }} />
        <Stack.Screen name="about" options={{ title: 'Giới thiệu' }} />
        <Stack.Screen name="contact" options={{ title: 'Liên hệ' }} />
        <Stack.Screen name="product" options={{ title: 'Sản phẩm' }} />
    </Stack>
  )
}
