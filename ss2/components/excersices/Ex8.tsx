import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

const ButtonShowcaseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton title="Button Primary" type="primary" onPress={() => {}} />
      <CustomButton title="Button Secondary" type="secondary" onPress={() => {}} />
      <CustomButton title="Button Danger" type="danger" onPress={() => {}} />
      <CustomButton title="Button Disabled" type="disabled" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default ButtonShowcaseScreen;
