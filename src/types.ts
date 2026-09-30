export const CATEGORIES = [
  'Fresh produce',
  'Meat and fish',
  'Cooked food',
  'Clothing',
  'Household goods',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const RISK_LEVELS = ['Low', 'Medium', 'High'] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

export type ZoneStatus = 'Open' | 'Pending' | 'Closed';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Zone {
  id: string;
  name: string;
  category: string;
  status: ZoneStatus;
  priority: Priority;
}

export interface FormValues {
  vendorAlias: string;
  stallCode: string;
  category: Category | null;
  contact: string;
  risk: RiskLevel | null;
  consent: boolean;
  imageUri: string | null;
}

export interface ReviewDraft {
  values: FormValues;
  timestamp: string; // ISO
}

export interface InspectionRecord {
  id: string;
  values: FormValues;
  createdAt: string; // ISO
  groupCode: string;
}
