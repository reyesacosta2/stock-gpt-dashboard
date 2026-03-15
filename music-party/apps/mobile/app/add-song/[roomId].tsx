import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { useRoomStore } from '../../src/store/room-store';

export default function AddSongScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [input, setInput] = useState('');
  const addQueueItem = useRoomStore((state) => state.addQueueItem);

  const onSubmit = () => {
    if (!input.trim()) return;

    addQueueItem({
      id: crypto.randomUUID(),
      title: input.trim(),
      artist: 'Unknown Artist',
      status: 'pending',
      votes: 0,
      addedBy: 'Guest',
    });

    router.back();
  };

  return (
    <Screen>
      <Text style={styles.heading}>Add a song request</Text>
      <TextInput
        style={styles.input}
        placeholder="Search title/artist or paste a link"
        placeholderTextColor="#6B7280"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonLabel}>Submit Request</Text>
      </TouchableOpacity>
      <Text style={styles.hint}>Room: {roomId}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: '#fff', fontSize: 24, fontWeight: '700' },
  input: { backgroundColor: '#1A1D24', color: '#fff', borderRadius: 12, padding: 12 },
  button: { backgroundColor: '#8B5CF6', padding: 14, borderRadius: 12, alignItems: 'center' },
  buttonLabel: { color: '#fff', fontWeight: '700' },
  hint: { color: '#9CA3AF' },
});
