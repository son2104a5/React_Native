import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const initialCourses = ['HTML', 'CSS', 'JavaScript', 'Java'];
  const moreCourses = ['Python', 'PHP', 'C#'];

  const [courses, setCourses] = useState(initialCourses);

  const loadMore = () => {
    setCourses([...courses, ...moreCourses]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        // Header
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Danh sách Khóa học</Text>
          </View>
        )}
        // Footer
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
  header: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
