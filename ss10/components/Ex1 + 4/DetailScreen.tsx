import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<DetailsRouteProp>();

  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Đây là trang chi tiết cho sản phẩm có ID:</Text>
      <Text style={styles.id}>{id}</Text>
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  id: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
