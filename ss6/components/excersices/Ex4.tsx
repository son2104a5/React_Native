import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const initialData = [
    'John Doe',
    'Jane Smith',
    'Samuel Johnson',
    'Emily Davis',
    'Michael Brown',
  ];

  const moreData = [
    'Sarah Wilson',
    'David Taylor',
    'James Anderson',
    'Mary Thomas',
    'Robert Lee',
  ];

  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);

  // Pull to Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(initialData); // reset lại danh sách ban đầu
      setRefreshing(false);
    }, 1500);
  };

  // Load More
  const loadMore = () => {
    setData([...data, ...moreData]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.button} onPress={loadMore}>
            <Text style={styles.buttonText}>TẢI THÊM</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  item: {
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
