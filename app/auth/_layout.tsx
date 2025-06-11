import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="onboarding_questions" options={{ headerShown: false }} />
    </Stack>
  );
}