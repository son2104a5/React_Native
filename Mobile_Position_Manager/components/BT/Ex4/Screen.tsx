import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import UserItem from './Item';
import store, { RootState } from '@/redux/store';

const UserList = () => {
  const users = useSelector((state: RootState) => state.favourite.users);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List Favorites User</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <UserItem id={item.id} name={item.name} isFavorite={item.isFavorite} />
        )}
      />
    </SafeAreaView>
  );
};

export default function Ex4() {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
