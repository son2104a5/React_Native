import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const Ex7 = () => {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isPortrait ? "📱 Portrait Mode" : "🖥️ Landscape Mode"}
      </Text>

      <FlatList
        data={items}
        key={isPortrait ? "portrait" : "landscape"}
        keyExtractor={(item) => item}
        numColumns={isPortrait ? 1 : 2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: "#4cafef",
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Ex7;
