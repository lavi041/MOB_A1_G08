import type { NavigatorScreenParams } from '@react-navigation/native';

export type InspectionStackParamList = {
  InspectionForm: undefined;
  Review: undefined;
};

export type RecordsStackParamList = {
  RecordsList: undefined;
  RecordDetails: { recordId: string };
};

export type RootTabParamList = {
  Home: undefined;
  NewInspection: NavigatorScreenParams<InspectionStackParamList> | undefined;
  Records: NavigatorScreenParams<RecordsStackParamList> | undefined;
};
