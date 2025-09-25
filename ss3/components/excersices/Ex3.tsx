import { Heart, MessageCircle, Send } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

const Ex3 = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
            <Image 
                source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
                style={{ borderRadius: 50, width: 30, height: 30 }}
            />
            <Text style={{ fontWeight: 'bold' }}>thuy_anh26</Text>
        </View>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/b8/86/b2/b886b20ce517adae1f8b2fb5bad00fe6.jpg' }}
          style={{ borderRadius: 16, width: 300, height: 350 }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 5 }}>
          <Heart color={'red'}/>
          <MessageCircle />
          <Send />
        </View>
        <View>
          <Text>thuy_anh26</Text>
          <Text>Một buổi chiều yên bình bên bờ biển🌊☀️</Text>
        </View>
    </View>
  )
}

export default Ex3;