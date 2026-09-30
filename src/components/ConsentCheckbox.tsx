import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}

export default function ConsentCheckbox({ checked, onChange, error }: Props) {
  return (
    <View style={styles.group}>
      <Pressable
        onPress={() => onChange(!checked)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        style={styles.row}
      >
        <View style={[styles.box, checked && styles.boxChecked, error ? styles.boxError : null]}>
          {checked ? <Text style={styles.tick}>✔</Text> : null}
        </View>
        <Text style={styles.text}>
          The vendor has agreed to this fictional inspection record (consent confirmed).
        </Text>
      </Pressable>
      {error ? (
        <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">⚠ {error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 48 },
  box: { width: 28, height: 28, borderRadius: radius.sm, borderWidth: 2, borderColor: colors.muted, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  boxError: { borderColor: colors.danger },
  tick: { color: '#FFFFFF', fontWeight: '800' },
  text: { flex: 1, fontSize: 15, color: colors.text },
  error: { color: colors.danger, fontSize: 14, marginTop: spacing.xs, fontWeight: '600' },
});
