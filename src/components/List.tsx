import React, {memo, PropsWithChildren} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import { scaleHeight, scaleWidth } from '../utils/responsive';

interface IListProps extends PropsWithChildren<any> {
  title: string;
  content: any;
  navigation: any;
}

const styles = StyleSheet.create({
    text: {
        fontSize: scaleWidth(18),
        fontWeight: 'bold',
        paddingBottom: scaleHeight(10),
        marginLeft: scaleWidth(15)
    },
    list: {
        marginTop: scaleHeight(22),
    },

});

const List = (props: IListProps) => {
  const {title, content, navigation} = props;
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}


export default memo(List);
