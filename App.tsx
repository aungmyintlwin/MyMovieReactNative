// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppFlow from './src/navigation'

export default function App() {
  return (
    <NavigationContainer>
      <AppFlow/>
    </NavigationContainer>
  );
}