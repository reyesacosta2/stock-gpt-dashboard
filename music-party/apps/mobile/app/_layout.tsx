import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#0E0F12' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="index" options={{ title: 'Music Party' }} />
      <Stack.Screen name="create-room" options={{ title: 'Create Room' }} />
      <Stack.Screen name="join-room" options={{ title: 'Join Room' }} />
      <Stack.Screen name="room/[roomId]" options={{ title: 'Room' }} />
      <Stack.Screen name="add-song/[roomId]" options={{ title: 'Add Song' }} />
      <Stack.Screen name="host-review/[roomId]" options={{ title: 'Host Review' }} />
    </Stack>
  );
}
