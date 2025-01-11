import React, {memo, PropsWithChildren} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import { scaleHeight, scaleWidth } from '../utils/responsive';

interface IListProps extends PropsWithChildren<any> {
  title: string;
  content: any;
  navigation: any
}

const styles = StyleSheet.create({
    text: {
        fontSize: scaleWidth(18),
        fontWeight: 'bold',
        paddingBottom: scaleHeight(10),
        marginLeft: scaleWidth(15),
        color: '#292424'
    },
    list: {
        marginTop: scaleHeight(22),
    },

});

const FavouriteList = (props: IListProps) => {
  const {title, content, navigation} = props;
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={content}
          numColumns={3}
          horizontal={false}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{height: scaleHeight(10)}}/>}
        />
      </View>
    </View>
  );
}


export default memo(FavouriteList);
