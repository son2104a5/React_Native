import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const employees = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Samuel Johnson' },
  { id: '4', name: 'Emily Davis' },
  { id: '5', name: 'Michael Brown' },
  { id: '6', name: 'Sarah Wilson' },
  { id: '7', name: 'David Taylor' },
  { id: '8', name: 'James Anderson' },
  { id: '9', name: 'Mary Thomas' },
  { id: '10', name: 'Robert Lee' },
];

export default function EmployeeList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Employee</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2, // tạo bóng nhẹ trên Android
    shadowColor: '#000', // bóng cho iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
