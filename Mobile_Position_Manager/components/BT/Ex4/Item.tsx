import { toggleFavorite } from '@/redux/slices/favourite.slice';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

interface Props {
  id: number;
  name: string;
  isFavorite: boolean;
}

export default function UserItem({ id, name, isFavorite }: Props) {
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <Text style={styles.username}>UserName: {name}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Favorites: </Text>
        <TouchableOpacity onPress={() => dispatch(toggleFavorite(id))}>
          <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '❔'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 6,
    elevation: 2,
  },
  username: { fontWeight: '600', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { fontWeight: '500' },
});
