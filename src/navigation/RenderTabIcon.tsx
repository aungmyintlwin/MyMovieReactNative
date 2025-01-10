import { View, Text } from 'react-native'
import React from 'react'
import { scaleHeight, scaleWidth } from "../utils/responsive";

import Icon from '@react-native-vector-icons/material-design-icons';

const RenderTabIcon = (route: {name: string}, focused: boolean, color: string, size: number) => {
  return (
    <View style={{ alignItems: "center",marginTop: scaleHeight(-5) }}>
        {
          route?.name === "Home" && (
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Icon name={focused ? "home-variant" : "home-variant-outline"} size={scaleWidth(size)} color={focused ? "#900" : color}/>
            </View>
          )
        }
        {
          route.name === "Favourite" && (
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Icon name={focused ? "heart" : "heart-outline"} size={scaleWidth(size)} color={focused ? "#900" : color}/>
            </View>
          )
        }
        {
          route.name === "History" && (
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Icon name={focused ? "clipboard-text-clock" : "clipboard-text-clock-outline"} size={scaleWidth(size)} color={focused ? "#900" : color}/>
            </View>
          )
        }
    </View>
  )
}

export default RenderTabIcon