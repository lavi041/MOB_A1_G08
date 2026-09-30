import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import ZoneCard from '../components/ZoneCard';
import { useInspection } from '../context/InspectionContext';
import { ZONES } from '../data/zones';
import { colors, radius, spacing } from '../theme';
import type { ZoneStatus } from '../types';

const FILTERS: ('All' | ZoneStatus)[] = ['All', 'Open', 'Pending', 'Closed'];

export default function HomeScreen() {
  const { records } = useInspection();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All' | ZoneStatus>('All');
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const data = useMemo(() => {
    if (simulateEmpty) return [];
    const q = query.trim().toLowerCase();
    return ZONES.filter(
      (z) => (status === 'All' || z.status === status) && `${z.name} ${z.category}`.toLowerCase().includes(q),
    );
  }, [query, status, simulateEmpty]);

  const clearFilters = () => {
    setQuery('');
    setStatus('All');
    setSimulateEmpty(false);
  };

  const header = (
    <View>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Assigned market zones</Text>
        <Text style={styles.summaryText}>
          {ZONES.length} zones assigned · {records.length} inspection{records.length === 1 ? '' : 's'} saved this session
        </Text>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search zones or categories"
        placeholderTextColor="#6B7A73"
        accessibilityLabel="Search zones or categories"
        style={styles.search}
      />

      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const selected = f === status;
          return (
            <Pressable
              key={f}
              onPress={() => setStatus(f)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`Filter by status ${f}`}
              style={[styles.filter, selected && styles.filterSelected]}
            >
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>{f}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Simulate empty list (demo)</Text>
        <Switch
          value={simulateEmpty}
          onValueChange={setSimulateEmpty}
          accessibilityLabel="Simulate empty list"
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(z) => z.id}
      renderItem={({ item }) => <ZoneCard zone={item} />}
      ListHeaderComponent={header}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <EmptyState
          icon="🔍"
          title="No zones to show"
          message="No market zones match your search or filter. Clear the filters to see all assigned zones."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  summary: { marginBottom: spacing.md },
  summaryTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  summaryText: { fontSize: 14, color: colors.muted, marginTop: 2 },
  search: { minHeight: 48, borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.card, paddingHorizontal: spacing.md, fontSize: 16, color: colors.text },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  filter: { minHeight: 44, paddingHorizontal: spacing.lg, borderRadius: radius.pill, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  filterSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: 15, fontWeight: '600', color: colors.text },
  filterTextSelected: { color: '#FFFFFF' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing.md, gap: spacing.md },
  switchLabel: { flex: 1, fontSize: 14, color: colors.muted },
});
