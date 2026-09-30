import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_NAME, GROUP_CODE } from '../config';
import { colors, radius, spacing } from '../theme';

export default function AppHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.row}>
        <View style={styles.titleCol}>
          <Text style={styles.app}>{APP_NAME}</Text>
          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
        </View>
        <View style={styles.badge} accessible accessibilityLabel={`Group verification code ${GROUP_CODE}`}>
          <Text style={styles.badgeText}>{GROUP_CODE}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.sm },
  titleCol: { flexShrink: 1 },
  app: { color: '#CFE6DB', fontSize: 12 },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  badge: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  badgeText: { color: '#1B1400', fontWeight: '700', fontSize: 13 },
});
