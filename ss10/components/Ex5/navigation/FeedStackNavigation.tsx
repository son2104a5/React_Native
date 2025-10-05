import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedListScreen from "../screens/FeedListScreen";
import FeedDetailScreen from "../screens/FeedDetailScreen";

const FeedStack = createStackNavigator();

export default function FeedStackNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedList"
        component={FeedListScreen}
        options={{ title: "Danh sách bài viết" }}
      />
      <FeedStack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{ title: "Chi tiết bài viết" }}
      />
    </FeedStack.Navigator>
  );
}
