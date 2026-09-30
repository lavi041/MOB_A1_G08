import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import ChoiceGroup from '../components/ChoiceGroup';
import ConsentCheckbox from '../components/ConsentCheckbox';
import ImagePickerField from '../components/ImagePickerField';
import TextField from '../components/TextField';
import { useInspection } from '../context/InspectionContext';
import type { InspectionStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';
import { CATEGORIES, RISK_LEVELS } from '../types';
import { FieldName, validateForm } from '../utils/validation';

type Props = NativeStackScreenProps<InspectionStackParamList, 'InspectionForm'>;

export default function InspectionFormScreen({ navigation }: Props) {
  const { form, setField, resetForm, startReview } = useInspection();
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validateForm(form);
  const errorCount = Object.keys(errors).length;
  const show = (f: FieldName) => (submitted || touched[f] ? errors[f] : undefined);
  const touch = (f: FieldName) => setTouched((t) => ({ ...t, [f]: true }));

  function onSubmit() {
    setSubmitted(true);
    if (errorCount > 0) return; // block invalid submission
    startReview();
    navigation.navigate('Review');
  }

  function onClear() {
    resetForm();
    setTouched({});
    setSubmitted(false);
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>New inspection</Text>
        <Text style={styles.sub}>Use fictional data only. Do not enter real names or phone numbers.</Text>

        {submitted && errorCount > 0 ? (
          <View style={styles.summary} accessibilityRole="alert" accessibilityLiveRegion="polite">
            <Text style={styles.summaryText}>
              ⚠ {errorCount} field{errorCount === 1 ? '' : 's'} need attention. Fix the messages below to continue.
            </Text>
          </View>
        ) : null}

        <TextField
          label="Vendor alias"
          hint="A made-up nickname, 3 to 24 characters"
          value={form.vendorAlias}
          onChangeText={(t) => setField('vendorAlias', t)}
          onBlur={() => touch('vendorAlias')}
          error={show('vendorAlias')}
          placeholder="e.g. Green Basket"
          maxLength={40}
        />

        <TextField
          label="Stall code"
          hint="Format MSM-A01 (MSM, letter A to D, two digits)"
          value={form.stallCode}
          onChangeText={(t) => setField('stallCode', t)}
          onBlur={() => touch('stallCode')}
          error={show('stallCode')}
          placeholder="MSM-A01"
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={10}
        />

        <ChoiceGroup
          label="Category"
          options={CATEGORIES}
          value={form.category}
          onChange={(v) => { setField('category', v); touch('category'); }}
          error={show('category')}
        />

        <TextField
          label="Contact number"
          hint="Fictional Rwanda format: 0788 000 123 or +250 788 000 123"
          value={form.contact}
          onChangeText={(t) => setField('contact', t)}
          onBlur={() => touch('contact')}
          error={show('contact')}
          placeholder="0788 000 123"
          keyboardType="phone-pad"
          maxLength={17}
        />

        <ChoiceGroup
          label="Risk level"
          options={RISK_LEVELS}
          value={form.risk}
          onChange={(v) => { setField('risk', v); touch('risk'); }}
          error={show('risk')}
        />

        <ImagePickerField uri={form.imageUri} onChange={(uri) => setField('imageUri', uri)} />

        <ConsentCheckbox
          checked={form.consent}
          onChange={(v) => { setField('consent', v); touch('consent'); }}
          error={show('consent')}
        />

        <View style={styles.actions}>
          <AppButton label="Review inspection" onPress={onSubmit} accessibilityHint="Checks all fields, then opens the review screen" />
          <AppButton label="Clear form" variant="secondary" onPress={onClear} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  sub: { fontSize: 14, color: colors.muted, marginTop: 2, marginBottom: spacing.lg },
  summary: { backgroundColor: colors.dangerBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg },
  summaryText: { color: colors.danger, fontWeight: '700', fontSize: 14 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
