import { PhoneContext } from "@/context/PhoneBookContext";
import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PhoneBookItem from "./PhoneBookItem";

export default function ListPhoneBook() {
  const { phoneBooks } = useContext(PhoneContext);

  return (
    <View style={styles.list}>
      <FlatList
        data={phoneBooks}
        keyExtractor={(item) => item.id ? String(item.id) : ""}
        renderItem={({ item }) => <PhoneBookItem phone={item} />}
      />vc        v bbbbbbbb gbhgggggggvvccccjkịuhbg ciuhngbv ckjhbvc9uyhgfdxzi8ùyokjnb 
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});
