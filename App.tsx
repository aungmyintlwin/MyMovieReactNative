// In App.js in a new project

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import AppFlow from './src/navigation'
import { LogBox } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  React.useEffect(() =>{
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppFlow/>
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}