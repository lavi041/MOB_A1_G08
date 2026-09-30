import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import InfoRow from '../components/InfoRow';
import { GROUP_CODE } from '../config';
import { useInspection } from '../context/InspectionContext';
import type { InspectionStackParamList, RootTabParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';
import { formatTimestamp } from '../utils/format';

type Props = CompositeScreenProps<
  NativeStackScreenProps<InspectionStackParamList, 'Review'>,
  BottomTabScreenProps<RootTabParamList>
>;

export default function ReviewScreen({ navigation }: Props) {
  const { review, saveReview } = useInspection();

  if (!review) {
    return (
      <View style={styles.center}>
        <EmptyState
          icon="📝"
          title="Nothing to review"
          message="Complete the inspection form first. Your review will appear here."
          actionLabel="Go to form"
          onAction={() => navigation.navigate('InspectionForm')}
        />
      </View>
    );
  }

  const v = review.values;

  function onSave() {
    const rec = saveReview();
    if (!rec) return;
    navigation.popToTop();
    navigation.navigate('Records', { screen: 'RecordsList' });
    Alert.alert('Inspection saved', `${rec.id} was added to this session's records.`);
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Review inspection</Text>
      <View style={styles.codeBox} accessible accessibilityLabel={`Group verification code ${GROUP_CODE}`}>
        <Text style={styles.codeLabel}>Group verification code</Text>
        <Text style={styles.code}>{GROUP_CODE}</Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Timestamp" value={formatTimestamp(review.timestamp)} />
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
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No photo attached. Go back to add one, or save without it.</Text>
        </View>
      )}

      <View style={styles.actions}>
        <AppButton label="Save inspection" onPress={onSave} />
        <AppButton label="Back to edit" variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, justifyContent: 'center' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  codeBox: { marginTop: spacing.md, backgroundColor: colors.warnBg, borderRadius: radius.md, padding: spacing.md },
  codeLabel: { fontSize: 13, color: colors.warnText },
  code: { fontSize: 20, fontWeight: '800', color: colors.text },
  card: { marginTop: spacing.md, backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md },
  section: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  image: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md, backgroundColor: colors.greyBg },
  noImage: { padding: spacing.lg, borderRadius: radius.md, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border, backgroundColor: colors.card },
  noImageText: { color: colors.muted, fontSize: 14 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
});
