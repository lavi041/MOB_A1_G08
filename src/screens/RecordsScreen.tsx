import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import { useInspection } from '../context/InspectionContext';
import type { RecordsStackParamList, RootTabParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';
import type { RiskLevel } from '../types';
import { formatTimestamp } from '../utils/format';

type Props = CompositeScreenProps<
  NativeStackScreenProps<RecordsStackParamList, 'RecordsList'>,
  BottomTabScreenProps<RootTabParamList>
>;

const RISK: Record<RiskLevel, { bg: string; fg: string }> = {
  Low: { bg: colors.okBg, fg: colors.okText },
  Medium: { bg: colors.warnBg, fg: colors.warnText },
  High: { bg: colors.dangerBg, fg: colors.danger },
};

export default function RecordsScreen({ navigation }: Props) {
  const { records } = useInspection();

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={records}
      keyExtractor={(r) => r.id}
      ListHeaderComponent={
        <Text style={styles.title}>Saved inspections ({records.length})</Text>
      }
      ListEmptyComponent={
        <EmptyState
          icon="📋"
          title="No inspections saved yet"
          message="Records you save during this session will be listed here."
          actionLabel="Start an inspection"
          onAction={() => navigation.navigate('NewInspection', { screen: 'InspectionForm' })}
        />
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          accessibilityRole="button"
          accessibilityLabel={`${item.id}, ${item.values.vendorAlias}, stall ${item.values.stallCode}, risk ${item.values.risk}`}
          accessibilityHint="Opens inspection details"
          onPress={() => navigation.navigate('RecordDetails', { recordId: item.id })}
        >
          <View style={styles.rowTop}>
            <Text style={styles.id}>{item.id}</Text>
            {item.values.risk ? (
              <Chip label={`Risk: ${item.values.risk}`} bg={RISK[item.values.risk].bg} fg={RISK[item.values.risk].fg} />
            ) : null}
          </View>
          <Text style={styles.alias}>{item.values.vendorAlias.trim()}</Text>
          <Text style={styles.meta}>
            {item.values.stallCode.trim()} · {item.values.category}
          </Text>
          <Text style={styles.meta}>{formatTimestamp(item.createdAt)}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  title: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  card: { backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md, minHeight: 48 },
  rowTop: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  id: { fontSize: 13, fontWeight: '700', color: colors.muted },
  alias: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: spacing.xs },
  meta: { fontSize: 14, color: colors.muted, marginTop: 2 },
});
