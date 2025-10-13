import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
        {/* Danh sách các trang sử dụng tab */}
        <Tabs.Screen name="index" options={{ title: 'Trang chủ' }} />
        <Tabs.Screen name="product-list" options={{ title: 'Danh sách Sản phẩm' }} />
        <Tabs.Screen name='account' options={{ title: 'Tài khoản' }}/>
    </Tabs>
  )
}
