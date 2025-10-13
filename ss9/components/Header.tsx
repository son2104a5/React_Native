import { PhoneContext } from '@/context/PhoneBookContext'
import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Header() {
    const { isShowForm, onOpenForm } = useContext(PhoneContext);

  return (
    <View style={styles.header}>
        <Text style={styles.title}>Danh bạ</Text>
        <Button title='Thêm' onPress={() => onOpenForm && onOpenForm()}/>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})