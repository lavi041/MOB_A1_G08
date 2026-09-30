import type { FormValues } from '../types';

// Stall code: "MSM-" + one letter A-D + two digits. Example: MSM-A01
export const STALL_CODE_PATTERN = /^MSM-[A-D]\d{2}$/;
// Rwanda-style mobile: 07[2|3|8|9] + 7 digits, or +250 form. Spaces/dashes ignored.
export const PHONE_PATTERN = /^(?:\+250|0)7[2389]\d{7}$/;

export type FieldName = 'vendorAlias' | 'stallCode' | 'category' | 'contact' | 'risk' | 'consent';
export type FormErrors = Partial<Record<FieldName, string>>;

export function validateForm(v: FormValues): FormErrors {
  const errors: FormErrors = {};

  const alias = v.vendorAlias.trim();
  if (!alias) errors.vendorAlias = 'Enter a vendor alias.';
  else if (alias.length < 3 || alias.length > 24)
    errors.vendorAlias = 'Alias must be 3 to 24 characters.';

  const code = v.stallCode.trim();
  if (!code) errors.stallCode = 'Enter the stall code.';
  else if (!STALL_CODE_PATTERN.test(code))
    errors.stallCode = 'Use the format MSM-A01 (MSM, letter A to D, two digits).';

  if (!v.category) errors.category = 'Choose a category.';

  const phone = v.contact.replace(/[\s-]/g, '');
  if (!phone) errors.contact = 'Enter a contact number.';
  else if (!PHONE_PATTERN.test(phone))
    errors.contact = 'Use a Rwanda format such as 0788 000 123 or +250 788 000 123.';

  if (!v.risk) errors.risk = 'Choose a risk level.';
  if (!v.consent) errors.consent = 'Consent must be confirmed before saving.';

  return errors;
}
