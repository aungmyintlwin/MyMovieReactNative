import React from "react";
import { StyleSheet } from "react-native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import DetailScreen from "../screens/DetailScreen";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

type HomeStackParamList = {
  HomeScreen: undefined;
  Details: {id: number};
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const navigationOptions : NativeStackNavigationOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerBackTitle: 'Back',

}


export default function HomeStack() {
  return (
      <Stack.Navigator initialRouteName="HomeScreen" >
        <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Details" component={DetailScreen} options={navigationOptions}/>
      </Stack.Navigator>
  )
}
