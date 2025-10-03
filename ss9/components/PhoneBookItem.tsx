import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function PhoneBookItem() {
  return (
    <View style={styles.item}>
        <Text>Tên: Nguyễn Văn A</Text>
        <Text>Sđt: 0123456789</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
    }
})