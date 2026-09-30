import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordDetailsScreen from '../screens/RecordDetailsScreen';
import RecordsScreen from '../screens/RecordsScreen';
import { colors } from '../theme';
import type { RecordsStackParamList } from './types';

const Stack = createNativeStackNavigator<RecordsStackParamList>();

export default function RecordsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
      <Stack.Screen name="RecordsList" component={RecordsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} options={{ title: 'Inspection Details', headerBackTitle: 'Records' }} />
    </Stack.Navigator>
  );
}
