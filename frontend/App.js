import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './screens/HomeScreen';
import RecordScreen from './screens/RecordScreen';
import EffectsScreen from './screens/EffectsScreen';
import PreviewScreen from './screens/PreviewScreen';
import ShareScreen from './screens/ShareScreen';
import LiveScreen from './screens/LiveScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Effects" component={EffectsScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen name="Share" component={ShareScreen} />
        <Stack.Screen name="Live" component={LiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

