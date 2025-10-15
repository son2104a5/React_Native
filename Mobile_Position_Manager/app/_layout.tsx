import { Slot } from "expo-router";
import { Provider } from "react-redux";
import React from "react";
import store from "@/redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
