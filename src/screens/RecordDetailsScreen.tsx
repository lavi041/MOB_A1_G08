import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import InfoRow from '../components/InfoRow';
import { useInspection } from '../context/InspectionContext';
import type { RecordsStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';
import { formatTimestamp } from '../utils/format';

type Props = NativeStackScreenProps<RecordsStackParamList, 'RecordDetails'>;

export default function RecordDetailsScreen({ route, navigation }: Props) {
  const { recordId } = route.params; // typed route parameter
  const { records } = useInspection();
  const record = records.find((r) => r.id === recordId);

  if (!record) {
    return (
      <View style={styles.center}>
        <EmptyState
          icon="❓"
          title="Record not found"
          message="This inspection is not in the current session."
          actionLabel="Back to records"
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  const v = record.values;
  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{record.id}</Text>
      <View style={styles.card}>
        <InfoRow label="Group verification code" value={record.groupCode} />
        <InfoRow label="Saved at" value={formatTimestamp(record.createdAt)} />
        <InfoRow label="Vendor alias" value={v.vendorAlias.trim()} />
        <InfoRow label="Stall code" value={v.stallCode.trim()} />
        <InfoRow label="Category" value={v.category ?? ''} />
        <InfoRow label="Contact number" value={v.contact.trim()} />
        <InfoRow label="Risk level" value={v.risk ?? ''} />
        <InfoRow label="Consent" value={v.consent ? 'Confirmed' : 'Not confirmed'} />
      </View>
      <Text style={styles.section}>Evidence photo</Text>
      {v.imageUri ? (
        <Image source={{ uri: v.imageUri }} style={styles.image} resizeMode="cover" accessibilityLabel="Evidence photo" />
      ) : (
        <Text style={styles.none}>No photo was attached to this inspection.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, justifyContent: 'center' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  card: { backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md },
  section: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  image: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md, backgroundColor: colors.greyBg },
  none: { color: colors.muted, fontSize: 14 },
});
