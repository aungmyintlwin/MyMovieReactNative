import React from "react";
import { Platform, StyleSheet } from "react-native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import DetailScreen from "../screens/DetailScreen";
import SearchResult from "../screens/SearchResult";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

type HomeStackParamList = {
  HomeScreen: undefined,
  Details: {id: number},
  SearchResult: {query: string}
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const navigationOptions : NativeStackNavigationOptions = {
  headerTransparent: Platform.OS === 'ios' ? true : false,
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerBackTitle: 'Back'
}


export default function HomeStack() {
  return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Details" component={DetailScreen} options={navigationOptions}/>
        <Stack.Screen name="SearchResult" component={SearchResult} options={navigationOptions}/>
      </Stack.Navigator>
  )
}
