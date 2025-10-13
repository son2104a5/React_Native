import { useRouter } from 'expo-router';
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function ProductList() {
    const router = useRouter();
  return (
    <View>
        <Text>ProductList</Text>
        <Button onPress={() => router.push('/product/1')} title='Chi tiết'/>
    </View>
  )
}
