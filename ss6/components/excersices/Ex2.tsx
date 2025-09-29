import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [data, setData] = useState<string[]>([]);

  const addData = () => {
    const newItems = [
      'HTML, CSS, JavaScript',
      'Python',
      'React.js',
    ];
    setData(newItems);
  };

  return (
    <View style={styles.container}>
      {/* Button thêm dữ liệu */}
      <TouchableOpacity style={styles.button} onPress={addData}>
        <Text style={styles.buttonText}>THÊM DỮ LIỆU</Text>
      </TouchableOpacity>

      {/* Danh sách hoặc hiển thị khi trống */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Không có dữ liệu</Text>
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
  button: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});
