import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InspectionProvider } from './src/context/InspectionContext';
import RootTabs from './src/navigation/RootTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <InspectionProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootTabs />
        </NavigationContainer>
      </InspectionProvider>
    </SafeAreaProvider>
  );
}
