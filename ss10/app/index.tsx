import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView>
      <Text>Home Page</Text>
      <Link href={"/contact"}>
        <Button title="Go to Contact Page" />
      </Link>
      <Link href={"/product"}>
        <Button title="Go to Product Page" />
      </Link>
    </SafeAreaView>
  );
}
