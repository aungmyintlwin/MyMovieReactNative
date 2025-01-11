import React, { memo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';



const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  }
});

function History({navigation}: {navigation: any}) {

  return (
    <SafeAreaView style={styles.container}>
          <View>
            <Text>History Screen</Text>
          </View>
    </ SafeAreaView>
  );
}
export default memo(History)