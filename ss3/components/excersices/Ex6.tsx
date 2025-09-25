import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const products = [
  { id: '1', name: 'Sản phẩm 1' },
  { id: '2', name: 'Sản phẩm 2' },
  { id: '3', name: 'Sản phẩm 3' },
  { id: '4', name: 'Sản phẩm 4' },
  { id: '5', name: 'Sản phẩm 5' },
  { id: '6', name: 'Sản phẩm 6' },
];

export default function ProductGridScreen() {
  const [numColumns, setNumColumns] = useState(2);
  const [itemSize, setItemSize] = useState({ width: 0, height: 0, fontSize: 14 });

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      let columns = 2;

      if (width > 900) {
        // Tablet
        columns = 4;
      } else if (width > height) {
        // Landscape
        columns = 3;
      } else {
        // Portrait
        columns = 2;
      }

      const itemWidth = width / columns - 20;
      setNumColumns(columns);
      setItemSize({
        width: itemWidth,
        height: itemWidth * 0.6,
        fontSize: itemWidth / 10,
      });
    };

    updateLayout();

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={[styles.item, { width: itemSize.width, height: itemSize.height }]}>
      <Text style={{ fontSize: itemSize.fontSize }}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // fix layout khi đổi columns
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    justifyContent: 'center',
    padding: 10,
  },
  item: {
    margin: 5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
