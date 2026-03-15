import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../src/components/Screen';

export default function WelcomeScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.title}>Music Party</Text>
        <Text style={styles.subtitle}>Host on Spotify. Guests request from anywhere.</Text>
      </View>
      <Link href="/create-room" asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonLabel}>Create Room</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/join-room" asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonLabel}>Join Room</Text>
        </TouchableOpacity>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 20, marginBottom: 20, gap: 8 },
  title: { color: '#fff', fontSize: 32, fontWeight: '700' },
  subtitle: { color: '#9CA3AF', fontSize: 16 },
  primaryButton: { backgroundColor: '#8B5CF6', borderRadius: 12, padding: 14, alignItems: 'center' },
  secondaryButton: { backgroundColor: '#1A1D24', borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonLabel: { color: '#fff', fontWeight: '600' },
});
