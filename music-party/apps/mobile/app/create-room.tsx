import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { useRoomStore } from '../src/store/room-store';

export default function CreateRoomScreen() {
  const [connecting, setConnecting] = useState(false);
  const setRoom = useRoomStore((state) => state.setRoom);

  const onCreateRoom = async () => {
    setConnecting(true);
    const roomId = crypto.randomUUID();
    const joinCode = Math.random().toString(36).slice(2, 8).toUpperCase();
    setRoom(roomId, joinCode);
    setConnecting(false);
    router.replace(`/room/${roomId}`);
  };

  return (
    <Screen>
      <Text style={styles.heading}>Create your room</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Playback provider</Text>
        <Text style={styles.value}>Spotify (v1)</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onCreateRoom} disabled={connecting}>
        <Text style={styles.buttonLabel}>{connecting ? 'Connecting…' : 'Connect Spotify & Create Room'}</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: '#fff', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#1A1D24', padding: 16, borderRadius: 12, gap: 6 },
  label: { color: '#9CA3AF' },
  value: { color: '#fff', fontWeight: '600' },
  button: { backgroundColor: '#8B5CF6', padding: 14, borderRadius: 12, alignItems: 'center' },
  buttonLabel: { color: '#fff', fontWeight: '700' },
});
