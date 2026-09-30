import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../theme';
import InspectionStack from './InspectionStack';
import RecordsStack from './RecordsStack';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const ICONS: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  NewInspection: 'add-circle',
  Records: 'list',
};

const TITLES: Record<keyof RootTabParamList, string> = {
  Home: 'Home',
  NewInspection: 'New Inspection',
  Records: 'Records',
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <AppHeader title={TITLES[route.name]} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="NewInspection" component={InspectionStack} options={{ tabBarLabel: 'New Inspection' }} />
      <Tab.Screen name="Records" component={RecordsStack} options={{ tabBarLabel: 'Records' }} />
    </Tab.Navigator>
  );
}
