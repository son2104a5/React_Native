import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

type RootDrawerParamList = {
  Home: undefined;
  Notifications: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Đây là màn hình Home</Text>
      <Text>Nhấn vào icon ☰ góc trên bên trái để mở menu.</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18 }}>Đây là màn hình Notifications</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#f8f8f8' },
          headerTintColor: '#000',
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Trang chủ',
            headerLeft: () => (
              <Button
                onPress={() => navigation.toggleDrawer()}
                title="☰"
                color="#000"
              />
            ),
          })}
        />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Thông báo' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
