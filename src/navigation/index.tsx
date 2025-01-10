import React from "react";
import { Text, View } from "react-native";

import { scaleHeight } from "../utils/responsive";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


import Icon from '@react-native-vector-icons/material-design-icons';
import Home from "../screens/Home";
import Favourite from "../screens/Favourite";
import History from "../screens/History";
import RenderTabIcon from "./RenderTabIcon";

type RootStackParamList = {
  Home: undefined;
  Favourite: undefined;
  History: undefined;
};
const AppFollow = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => RenderTabIcon(route,focused,color,size),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};
export default AppFollow;