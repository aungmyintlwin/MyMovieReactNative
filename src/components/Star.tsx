import { StyleSheet, View } from 'react-native'
import React, { FC, memo } from 'react'

import Icon from '@react-native-vector-icons/material-design-icons';
import { scaleWidth } from '../utils/responsive';


type Props = {
  stars: number
}

const Star: FC<Props> = ({
  stars
}) => {
  const styles = useThemeStyle();

  const ratingStar = Array.from({length: 5}, (elem, index) => {
    return (
      <View key={index}>
        {stars >= index + 1 ? (
            <Icon  name={"star"} size={scaleWidth(32)} color={'#faad14'}/>
        ) : (
            <Icon  name={"star-outline"} size={scaleWidth(32)} color={"#900"}/>
        )}
      </View>
    );
  });
  return <View style={styles.container}>{ratingStar}</View>;
    
}

export default memo(Star)

const useThemeStyle = () => StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 0,
  }
})




