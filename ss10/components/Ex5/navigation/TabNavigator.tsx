import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MessagesScreen from "../screens/MessagesScreen";
import { Ionicons } from "@expo/vector-icons";
import FeedStackNavigator from "./FeedStackNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "list";
          if (route.name === "FeedTab") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "MessagesTab") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="FeedTab"
        component={FeedStackNavigator}
        options={{ title: "Bảng tin", headerShown: false }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={MessagesScreen}
        options={{ title: "Tin nhắn" }}
      />
    </Tab.Navigator>
  );
}
