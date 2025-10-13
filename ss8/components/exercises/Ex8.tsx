import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserV1 = {
  name: string;
};

type UserV2 = {
  user: {
    firstName: string;
    lastName: string;
  };
  version: number;
};

const USER_KEY = "user_data";

const migrateUserData = async () => {
  try {
    const stored = await AsyncStorage.getItem(USER_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    if (parsed.version === 2) {
      return parsed as UserV2;
    }

    if (parsed.name) {
      const [firstName, ...rest] = parsed.name.split(" ");
      const lastName = rest.join(" ");
      const newData: UserV2 = {
        user: {
          firstName,
          lastName,
        },
        version: 2,
      };

      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newData));
      return newData;
    }

    return null;
  } catch (e) {
    console.log("Migration error:", e);
    return null;
  }
};

const Ex8 = () => {
  const [user, setUser] = useState<UserV2 | null>(null);

  useEffect(() => {
    const init = async () => {
      const migratedData = await migrateUserData();
      if (migratedData) {
        setUser(migratedData);
      }
    };
    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <Text>
          Xin chào {user.user.firstName} {user.user.lastName}
        </Text>
      ) : (
        <Text>Chưa có dữ liệu người dùng</Text>
      )}
    </View>
  );
};

export default Ex8;
