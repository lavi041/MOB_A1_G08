import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InspectionFormScreen from '../screens/InspectionFormScreen';
import ReviewScreen from '../screens/ReviewScreen';
import { colors } from '../theme';
import type { InspectionStackParamList } from './types';

const Stack = createNativeStackNavigator<InspectionStackParamList>();

export default function InspectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
      <Stack.Screen name="InspectionForm" component={InspectionFormScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Review', headerBackTitle: 'Form' }} />
    </Stack.Navigator>
  );
}
