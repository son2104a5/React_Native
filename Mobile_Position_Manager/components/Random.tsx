import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { createRandomNumber } from '@/redux/slices/counter.slice'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Random() {
    const result = useAppSelector(state => state.counter)
    const dispatch = useAppDispatch()

    const handleRandom = () => {
        dispatch(createRandomNumber(Math.ceil(Math.random() * 10000)))
    }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, gap: 5}}>
        <Text>Random Number: {result.numbers}</Text>
        <Button title='create' onPress={handleRandom} />
    </View>
  )
}
