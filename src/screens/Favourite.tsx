import React, { memo, useEffect } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {IPopularMovieResult} from '../types/popularmovie.result.model';

import {
  MOVIE_API_URL,
  AUTH_TOKEN,
  ACCOUNT_ID
} from "../utils/constants";
import { useQuery } from '@tanstack/react-query';
import Slider from '../components/Slider';
import FavouriteList from '../components/FavouriteList';
import { scaleHeight } from '../utils/responsive';


const dimension = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scaleHeight(20)
  },
});
const favouriteMovies = async (): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/account/${ACCOUNT_ID}/favorite/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};

function Favourite({navigation}: {navigation: any}) {
  const favouriteMoviesQuery = useQuery({
    queryKey: ['favourite-movies'],
    queryFn: favouriteMovies,
  })
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
      favouriteMoviesQuery?.refetch()
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
          {!favouriteMoviesQuery.isLoading && !favouriteMoviesQuery.error && favouriteMoviesQuery.isSuccess && favouriteMoviesQuery?.data?.results.length > 0 ? (
            <View style={styles.carousel}>
              <FavouriteList navigation={navigation} title="My Favourite Movies" content={favouriteMoviesQuery?.data?.results} />
            </View>
          ) : null}
    </ SafeAreaView>
  );
}
export default memo(Favourite)