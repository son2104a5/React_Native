import { Link, useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function ContactPage() {
    const router = useRouter();
  return (
    <View>
      <Text>ContactPage</Text>
      <Button title="About Page" onPress={() => router.push("/about")} />
    </View>
  );
}
