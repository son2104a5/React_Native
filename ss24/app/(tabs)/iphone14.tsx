import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Card, Text, Button, Chip, Divider } from 'react-native-paper';

export default function IPhone14Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header mode="small" elevated>
        <Appbar.Content title="iPhone 14" />
        <Appbar.Action icon="heart-outline" onPress={() => {}} />
        <Appbar.Action icon="share-variant" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Card mode="elevated" style={styles.card}>
          <Card.Cover
            source={{
              uri: 'https://images.unsplash.com/photo-1661961110389-1b01a59cfe8d?q=80&w=1400&auto=format&fit=crop',
            }}
          />
          <View style={styles.content}>
            <Text variant="headlineSmall" style={styles.title}>
              iPhone 14 128GB
            </Text>
            <View style={styles.priceRow}>
              <Text variant="headlineSmall" style={styles.price}>
                18.990.000₫
              </Text>
              <Chip compact>Trả góp 0%</Chip>
            </View>
            <Text variant="bodyMedium" style={styles.desc}>
              Màn hình Super Retina XDR 6.1", chip A15 Bionic, camera kép 12MP.
            </Text>
            <Divider style={{ marginVertical: 12 }} />
            <View style={styles.actions}>
              <Button mode="outlined" icon="cart-outline" style={{ flex: 1 }}>
                Thêm vào giỏ
              </Button>
              <Button mode="contained" icon="lightning-bolt" style={{ flex: 1 }}>
                Mua ngay
              </Button>
            </View>
          </View>
        </Card>

        <Card mode="contained" style={styles.specCard}>
          <Card.Title title="Thông số kỹ thuật" />
          <Card.Content>
            <Text>• Màn hình: OLED, 6.1"</Text>
            <Text>• Chip: Apple A15 Bionic</Text>
            <Text>• Camera: 12MP + 12MP</Text>
            <Text>• Pin: 3279 mAh</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#E53935',
    fontWeight: '700',
  },
  desc: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  specCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});


