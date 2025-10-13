import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Header from './Header'
import ListPhoneBook from './ListPhoneBook'
import Form from './Form'

const dimensions = Dimensions.get('window')

export default function PhoneApp() {
  return (
    <>
        <View style={styles.container}>
            <Header />
            <ListPhoneBook />
        </View>

        <Form />
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        height: dimensions.height,
        backgroundColor: '#f1f1f1ff'
    }
})