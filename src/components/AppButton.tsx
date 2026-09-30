import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  accessibilityHint?: string;
}

export default function AppButton({ label, onPress, variant = 'primary', accessibilityHint }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [styles.base, styles[variant], pressed && { opacity: 0.8 }]}
    >
      <Text style={[styles.text, variant === 'primary' ? styles.textOnDark : variant === 'danger' ? styles.textDanger : styles.textPrimary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 48, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexGrow: 1 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.primary },
  danger: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.danger },
  text: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  textOnDark: { color: '#FFFFFF' },
  textPrimary: { color: colors.primary },
  textDanger: { color: colors.danger },
});
