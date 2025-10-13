import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

export default function App() {
  const DATA = [
    {
      title: 'Điện thoại',
      data: ['iPhone', 'Samsung Galaxy', 'Google Pixel'],
    },
    {
      title: 'Laptop',
      data: ['MacBook Pro', 'Dell XPS', 'Lenovo ThinkPad'],
    },
    {
      title: 'Máy tính bảng',
      data: ['iPad Pro', 'Samsung Galaxy Tab', 'Microsoft Surface'],
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
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
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginTop: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
});
