import React from 'react';
import { colors } from '../theme';
import type { ZoneStatus } from '../types';
import Chip from './Chip';

const STYLE: Record<ZoneStatus, { bg: string; fg: string; glyph: string }> = {
  Open: { bg: colors.okBg, fg: colors.okText, glyph: '✔' },
  Pending: { bg: colors.warnBg, fg: colors.warnText, glyph: '…' },
  Closed: { bg: colors.greyBg, fg: colors.greyText, glyph: '✖' },
};

export default function StatusChip({ status }: { status: ZoneStatus }) {
  const s = STYLE[status];
  return <Chip label={`${s.glyph} ${status}`} bg={s.bg} fg={s.fg} />;
}
