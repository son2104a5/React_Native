import React from 'react'
import { Text, View } from 'react-native';

interface PropTypes {
    userName?: string;
    age?: number;
    email?: string;
}

export default function GrandChildrenComponent({userName, age, email}: PropTypes) {
  return (
    <View>
        <Text>GrandChildrenComponent</Text>

        <Text>Username of GrandChildren: {userName}</Text>
        <Text>Age: {age}</Text>
        <Text>Email: {email}</Text>
    </View>
  )
}
