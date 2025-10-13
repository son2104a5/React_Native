import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Profile {
    name: string;
    email: string;
    avatarUrl: string;
    jobTitle: string;
}

interface PropTypes {
    profile: Profile;
}

export default function Ex1({ profile }: PropTypes) {
  return (
    <>
      <View style={{ display: "flex", alignItems: "center", margin: 20, borderWidth: 1, borderColor: 'gray', padding: 20, borderRadius: 10 }}>
          <Image
          source={{
              uri: profile.avatarUrl,
          }}
          style={styles.image}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text>{profile.jobTitle}</Text>
          <Text>{profile.email}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10
    }
})