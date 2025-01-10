// In App.js in a new project

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';

import AppFlow from './src/navigation'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppFlow/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}