import React, { useState } from "react";
import { View, Text, SectionList, TextInput, StyleSheet } from "react-native";

const DATA = [
  {
    title: "Điện thoại",
    data: ["iPhone", "Samsung Galaxy", "Google Pixel", "OnePlus", "Xiaomi"]
  },
  {
    title: "Laptop",
    data: ["MacBook Pro", "Dell XPS", "Lenovo ThinkPad", "HP Spectre", "Asus ZenBook"]
  },
  {
    title: "Máy tính bảng",
    data: ["iPad Pro", "Samsung Tab", "Xiaomi Pad"]
  }
];

export default function App() {
  const [query, setQuery] = useState("");

  // Hàm filter theo từ khóa
  const filteredData = DATA.map(section => {
    const filteredItems = section.data.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    return { ...section, data: filteredItems };
  }).filter(section => section.data.length > 0); // loại section trống

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Tìm kiếm..."
        value={query}
        onChangeText={setQuery}
      />

      <SectionList
        sections={filteredData}
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
    marginTop: 40,
    paddingHorizontal: 10
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  },
  header: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 4
  },
  headerText: {
    fontWeight: "bold"
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd"
  }
});
