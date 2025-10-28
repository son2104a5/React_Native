import { Stack, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as any;
        console.log("📩 Notification tapped:", data);

        if (data?.screen === "Details") {
          router.push({
            pathname: "/details",
            params: { id: data.itemId },
          });
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang chủ" }} />
      <Stack.Screen name="details" options={{ title: "Chi tiết" }} />
    </Stack>
  );
}
