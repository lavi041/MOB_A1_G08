import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import type { Priority } from '../types';

const BORDER: Record<Priority, string> = {
  High: colors.danger,
  Medium: colors.warnText,
  Low: colors.muted,
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <View style={[styles.badge, { borderColor: BORDER[priority] }]}>
      <Text style={[styles.text, { color: BORDER[priority] }]}>Priority: {priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderWidth: 1.5, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2, alignSelf: 'flex-start' },
  text: { fontSize: 13, fontWeight: '700' },
});
