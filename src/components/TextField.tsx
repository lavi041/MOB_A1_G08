import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props extends TextInputProps {
  label: string;
  hint?: string;
  error?: string;
}

export default function TextField({ label, hint, error, style, ...rest }: Props) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      <TextInput
        {...rest}
        accessibilityLabel={label}
        placeholderTextColor="#6B7A73"
        style={[styles.input, error ? styles.inputError : null, style]}
      />
      {error ? (
        <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">
          ⚠ {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: spacing.lg },
  label: { fontSize: 16, fontWeight: '700', color: colors.text },
  hint: { fontSize: 13, color: colors.muted, marginTop: 2 },
  input: { marginTop: spacing.xs, minHeight: 48, borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.card, paddingHorizontal: spacing.md, fontSize: 16, color: colors.text },
  inputError: { borderColor: colors.danger, backgroundColor: colors.dangerBg },
  error: { color: colors.danger, fontSize: 14, marginTop: spacing.xs, fontWeight: '600' },
});
