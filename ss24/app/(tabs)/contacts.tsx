import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Searchbar, List, Avatar, Divider, FAB } from 'react-native-paper';

type Contact = {
  id: string;
  name: string;
  subtitle?: string;
};

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'An Nguyễn', subtitle: 'Cơ quan' },
  { id: '2', name: 'Bình Trần', subtitle: 'Bạn bè' },
  { id: '3', name: 'Châu Lê' },
  { id: '4', name: 'Dũng Phạm' },
  { id: '5', name: 'Hà Đỗ', subtitle: 'Gia đình' },
  { id: '6', name: 'Lan Phạm' },
  { id: '7', name: 'Minh Trí' },
  { id: '8', name: 'Nga Vũ' },
  { id: '9', name: 'Quang Anh' },
  { id: '10', name: 'Tuấn Kiệt' },
];

export default function ContactsScreen() {
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!query) return MOCK_CONTACTS;
    return MOCK_CONTACTS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header mode="small" elevated>
        <Appbar.Content title="Danh bạ" />
        <Appbar.Action icon="account-plus" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
        <Searchbar
          placeholder="Tìm kiếm bạn bè, nhóm"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.subtitle}
              left={() => (
                <Avatar.Text size={40} label={item.name.split(' ').map((w) => w[0]).join('').slice(0, 2)} />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <FAB icon="message-plus" style={styles.fab} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    margin: 16,
    borderRadius: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
});


