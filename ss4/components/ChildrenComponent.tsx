import React from 'react'
import { Text, View } from 'react-native'
import GrandChildrenComponent from './GrandChildrenComponent'

interface PropTypes {
    userName?: string;
    age?: number;
}

export default function ChildrenComponent({userName, age}: PropTypes) {
    console.log();
    
  return (
    <View>
        <Text>ChildrenComponent</Text>

        <Text>Username Of Children: {userName}</Text>
        <Text>Age: {age}</Text>

        <GrandChildrenComponent email='nva@gmail.com' userName={userName} age={age} />
    </View>
  )
}
