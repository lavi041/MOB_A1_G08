import React, { useState } from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, radius, spacing } from '../theme';
import AppButton from './AppButton';

interface Props {
  uri: string | null;
  onChange: (uri: string | null) => void;
}

type Notice = { kind: 'info' | 'error'; text: string; showSettings?: boolean } | null;

export default function ImagePickerField({ uri, onChange }: Props) {
  const [notice, setNotice] = useState<Notice>(null);

  async function pick(source: 'camera' | 'gallery') {
    setNotice(null);
    try {
      const perm =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!perm.granted) {
        const what = source === 'camera' ? 'Camera' : 'Gallery';
        const other = source === 'camera' ? 'choose a photo from the gallery' : 'take a photo with the camera';
        setNotice({
          kind: 'error',
          showSettings: !perm.canAskAgain,
          text: `${what} permission was denied, so no photo was added. ${
            perm.canAskAgain ? 'Tap the button again to allow it, or ' : 'Open app settings to enable it, or '
          }${other} instead.`,
        });
        return;
      }

      const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.7, allowsEditing: false };
      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);

      if (result.canceled || !result.assets || result.assets.length === 0) {
        setNotice({
          kind: 'info',
          text: uri
            ? 'No new photo was selected. Your current photo is unchanged.'
            : 'No photo was selected. You can try again, or continue without an image.',
        });
        return;
      }
      onChange(result.assets[0].uri);
    } catch {
      setNotice({
        kind: 'error',
        text: 'The camera or gallery could not be opened on this device. Try the other option.',
      });
    }
  }

  return (
    <View style={styles.group}>
      <Text style={styles.label}>Evidence photo</Text>
      <Text style={styles.hint}>Capture a photo or choose one from the gallery. One image only.</Text>

      {uri ? (
        <View style={styles.previewWrap}>
          <Image source={{ uri }} style={styles.preview} resizeMode="cover" accessibilityLabel="Selected evidence photo preview" />
        </View>
      ) : (
        <View style={styles.previewEmpty}>
          <Text style={styles.previewEmptyText}>No photo selected yet</Text>
        </View>
      )}

      <View style={styles.btnRow}>
        <AppButton label={uri ? 'Replace: take photo' : 'Take photo'} variant="primary" onPress={() => pick('camera')} />
        <AppButton label={uri ? 'Replace: gallery' : 'Choose from gallery'} variant="secondary" onPress={() => pick('gallery')} />
      </View>
      {uri ? (
        <View style={styles.btnRow}>
          <AppButton label="Remove photo" variant="danger" onPress={() => { onChange(null); setNotice({ kind: 'info', text: 'Photo removed.' }); }} />
        </View>
      ) : null}

      {notice ? (
        <View style={[styles.notice, notice.kind === 'error' ? styles.noticeError : styles.noticeInfo]} accessibilityLiveRegion="polite">
          <Text style={[styles.noticeText, { color: notice.kind === 'error' ? colors.danger : colors.infoText }]}>
            {notice.kind === 'error' ? '⚠ ' : 'ℹ '}{notice.text}
          </Text>
          {notice.showSettings ? (
            <View style={{ marginTop: spacing.sm }}>
              <AppButton label="Open app settings" variant="secondary" onPress={() => Linking.openSettings()} />
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: spacing.lg },
  label: { fontSize: 16, fontWeight: '700', color: colors.text },
  hint: { fontSize: 13, color: colors.muted, marginTop: 2 },
  previewWrap: { marginTop: spacing.sm, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  preview: { width: '100%', aspectRatio: 4 / 3, backgroundColor: colors.greyBg },
  previewEmpty: { marginTop: spacing.sm, height: 120, borderRadius: radius.md, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card },
  previewEmptyText: { color: colors.muted, fontSize: 14 },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  notice: { marginTop: spacing.sm, padding: spacing.md, borderRadius: radius.md },
  noticeError: { backgroundColor: colors.dangerBg },
  noticeInfo: { backgroundColor: colors.infoBg },
  noticeText: { fontSize: 14, fontWeight: '600' },
});
