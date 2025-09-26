import React, { useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';

export default function DemoState() {
  const [count, setCount] = useState<number>(0);

  const handleIncrease = () => {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);
  }

    //   setState dựa vào cơ chế bất đồng bộ: Queue
    //   Batch Update
  return (
    <View>
        <Text>Count: {count}</Text>
        <Button title='Increase' onPress={handleIncrease}/>
        <Pressable onPress={() => console.log('onPress được chạy')}>
            <Text>Button 1</Text>
        </Pressable>
        <Pressable onLongPress={() => console.log('onLongPress được chạy')}>
            <Text>Button 2</Text>
        </Pressable>
        <Pressable onPressIn={() => console.log('onPressIn được chạy')}>
            <Text>Button 3</Text>
        </Pressable>
        <Pressable onPressOut={() => console.log('onPressOut được chạy')}>
            <Text>Button 4</Text>
        </Pressable>
    </View>
  )
}
