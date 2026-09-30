import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { GROUP_CODE } from '../config';
import type { FormValues, InspectionRecord, ReviewDraft } from '../types';

export const EMPTY_FORM: FormValues = {
  vendorAlias: '',
  stallCode: '',
  category: null,
  contact: '',
  risk: null,
  consent: false,
  imageUri: null,
};

interface InspectionContextValue {
  form: FormValues;
  setField: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
  resetForm: () => void;
  review: ReviewDraft | null;
  startReview: () => void;
  saveReview: () => InspectionRecord | null;
  records: InspectionRecord[];
}

const Ctx = createContext<InspectionContextValue | null>(null);

// Lives above the navigators, so tab switches and back navigation never lose the session.
export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [review, setReview] = useState<ReviewDraft | null>(null);
  const [records, setRecords] = useState<InspectionRecord[]>([]);

  const setField = useCallback(
    <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const resetForm = useCallback(() => setForm(EMPTY_FORM), []);

  const startReview = useCallback(() => {
    setReview({ values: { ...form }, timestamp: new Date().toISOString() });
  }, [form]);

  const saveReview = useCallback((): InspectionRecord | null => {
    if (!review) return null;
    const record: InspectionRecord = {
      id: `INS-${String(records.length + 1).padStart(3, '0')}`,
      values: review.values,
      createdAt: review.timestamp,
      groupCode: GROUP_CODE,
    };
    setRecords((prev) => [record, ...prev]);
    setReview(null);
    setForm(EMPTY_FORM);
    return record;
  }, [review, records.length]);

  const value = useMemo(
    () => ({ form, setField, resetForm, review, startReview, saveReview, records }),
    [form, setField, resetForm, review, startReview, saveReview, records],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useInspection(): InspectionContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useInspection must be used inside InspectionProvider');
  return ctx;
}
