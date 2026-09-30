import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

export default function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.greyBg },
  label: { fontSize: 13, color: colors.muted },
  value: { fontSize: 16, fontWeight: '600', color: colors.text, marginTop: 2 },
});
