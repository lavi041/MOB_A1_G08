import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import type { Zone } from '../types';
import PriorityBadge from './PriorityBadge';
import StatusChip from './StatusChip';

export default function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`${zone.name}, ${zone.category}, status ${zone.status}, priority ${zone.priority}`}
    >
      <View style={styles.top}>
        <View style={styles.placeholder} importantForAccessibility="no">
          <Text style={styles.placeholderText}>{zone.name.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{zone.name}</Text>
          <Text style={styles.category}>{zone.category}</Text>
        </View>
      </View>
      <View style={styles.chips}>
        <StatusChip status={zone.status} />
        <PriorityBadge priority={zone.priority} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md },
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  placeholder: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.okBg, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { fontSize: 24, fontWeight: '700', color: colors.primary },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: colors.text },
  category: { fontSize: 14, color: colors.muted, marginTop: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
});
