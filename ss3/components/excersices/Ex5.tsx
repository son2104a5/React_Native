import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Nội dung của ứng dụng ở đây...</Text>
      <Text style={styles.title}>Header ở trên sẽ tự động thay đổi theo nền tảng</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
      android: {
        backgroundColor: '#2196F3', // Material Blue
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        textAlign: 'center',
        color: '#000',
      },
      android: {
        textAlign: 'left',
        color: '#fff',
      },
    }),
  },
});
