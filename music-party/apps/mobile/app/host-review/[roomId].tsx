import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../src/components/Screen';

export default function HostReviewScreen() {
  return (
    <Screen>
      <Text style={styles.heading}>Low-confidence matches</Text>
      <View style={styles.card}>
        <Text style={styles.title}>No pending reviews</Text>
        <Text style={styles.meta}>When score is between 0.75 and 0.89, requests appear here.</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlLabel}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlLabel}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlLabel}>Resume</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: '#fff', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#1A1D24', borderRadius: 12, padding: 14, gap: 6 },
  title: { color: '#fff', fontWeight: '600' },
  meta: { color: '#9CA3AF' },
  controls: { flexDirection: 'row', gap: 8 },
  controlButton: { backgroundColor: '#8B5CF6', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  controlLabel: { color: '#fff', fontWeight: '700' },
});
