import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      initialRouteName="index" 
      screenOptions={{ 
        headerShown: false,
        animation: 'ios_from_right'
      }}
    >
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="home" options={{ title: "Wallpapers" }} />
    </Stack>
  );
}
