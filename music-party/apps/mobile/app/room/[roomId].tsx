import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { useRoomStore } from '../../src/store/room-store';

export default function RoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const queue = useRoomStore((state) => state.queue);
  const vote = useRoomStore((state) => state.vote);

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Room {roomId}</Text>
        <Text style={styles.subtitle}>Current song syncs from host Spotify playback.</Text>
      </View>
      <Link href={`/add-song/${roomId}`} asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Add Song</Text>
        </TouchableOpacity>
      </Link>
      <Link href={`/host-review/${roomId}`} asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Host Review</Text>
        </TouchableOpacity>
      </Link>
      {queue.map((item) => (
        <View key={item.id} style={styles.queueItem}>
          <View>
            <Text style={styles.queueTitle}>{item.title}</Text>
            <Text style={styles.queueMeta}>by {item.artist} · added by {item.addedBy}</Text>
            <Text style={styles.queueStatus}>status: {item.status}</Text>
          </View>
          <View style={styles.voteCol}>
            <TouchableOpacity onPress={() => vote(item.id, 1)}>
              <Text style={styles.voteButton}>▲</Text>
            </TouchableOpacity>
            <Text style={styles.votes}>{item.votes}</Text>
            <TouchableOpacity onPress={() => vote(item.id, -1)}>
              <Text style={styles.voteButton}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1A1D24', borderRadius: 12, padding: 14, gap: 6 },
  title: { color: '#fff', fontWeight: '700', fontSize: 20 },
  subtitle: { color: '#9CA3AF' },
  primaryButton: { backgroundColor: '#8B5CF6', borderRadius: 12, padding: 12, alignItems: 'center' },
  secondaryButton: { backgroundColor: '#1A1D24', borderRadius: 12, padding: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  queueItem: {
    backgroundColor: '#151821',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  queueTitle: { color: '#fff', fontWeight: '700' },
  queueMeta: { color: '#9CA3AF' },
  queueStatus: { color: '#C4B5FD' },
  voteCol: { alignItems: 'center', justifyContent: 'center' },
  voteButton: { color: '#fff', fontSize: 18 },
  votes: { color: '#fff', fontWeight: '700' },
});
