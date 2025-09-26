import React from 'react'
import { Text, View } from 'react-native'
import ChildrenComponent from './ChildrenComponent'

export default function ParentComponent() {
    const userName: string = 'Nguyễn Văn A';
  return (
    <View>
        <Text>ParentComponent</Text>
        <ChildrenComponent userName={userName} age={20} />
    </View>
  )
}
