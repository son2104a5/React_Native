import { Image } from 'expo-image';
import { Button, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications'

export default function HomeScreen() {
  const scheduleNotificationHandler = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Thông báo',
          body: 'Đây là nội dung của Local Notification',
          data: { customData: 'Đây là data đi kèm' },
          sound: true
        },
        trigger: {
          seconds: 5,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL
        }
      })
  }
  return (
    <SafeAreaView>
      <Button title='Hiển thị thông báo sau 5s' onPress={scheduleNotificationHandler}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
