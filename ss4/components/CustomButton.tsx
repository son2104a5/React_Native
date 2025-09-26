import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface PropTypes {
    title: string;
    children: React.ReactNode
}

export default function CustomButton({ title, children }: PropTypes) {
  return (
    <>
        <Pressable style={styles.button}>
            <Text style={{ color: '#fff' }}>{children}</Text>
        </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    button: {
        height: 36,
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})