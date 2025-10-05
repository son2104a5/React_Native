import { Link, useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function AboutPage() {
  const router = useRouter();
  return (
    <View>
      <Text>About Page</Text>
      <Button title="Go to Home Page" onPress={() => router.back()} />
    </View>
  );
}
