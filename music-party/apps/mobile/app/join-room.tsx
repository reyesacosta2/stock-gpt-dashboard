import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Screen } from '../src/components/Screen';

export default function JoinRoomScreen() {
  const [code, setCode] = useState('');
  const [displayName, setDisplayName] = useState('');

  const onJoin = () => {
    if (!code || !displayName) return;
    router.replace(`/room/${code.toUpperCase()}`);
  };

  return (
    <Screen>
      <Text style={styles.heading}>Join a room</Text>
      <TextInput
        style={styles.input}
        placeholder="Room code"
        placeholderTextColor="#6B7280"
        autoCapitalize="characters"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Display name"
        placeholderTextColor="#6B7280"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TouchableOpacity style={styles.button} onPress={onJoin}>
        <Text style={styles.buttonLabel}>Join Room</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: '#fff', fontSize: 24, fontWeight: '700' },
  input: { backgroundColor: '#1A1D24', color: '#fff', borderRadius: 12, padding: 12 },
  button: { backgroundColor: '#8B5CF6', padding: 14, borderRadius: 12, alignItems: 'center' },
  buttonLabel: { color: '#fff', fontWeight: '700' },
});
