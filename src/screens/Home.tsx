import React, { memo } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {IPopularMovieResult} from '../types/popularmovie.result.model';

import List from '../components/List';

import {
  MOVIE_API_URL,
  AUTH_TOKEN
} from "../utils/constants";
import { useQuery } from '@tanstack/react-query';
import Slider from '../components/Slider';


const dimension = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    gap: 0,
    padding: 0,
    margin: 0,
    width: dimension.width,
    height: dimension.height / 1.5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: dimension.width,
    height: dimension.height / 1.5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    objectFit: 'cover',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const fetchPopularMoves = async (): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/popular`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};
const nowPlayingMoves = async (): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/now_playing`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};
const topRatedMoves = async (): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/top_rated`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};
const fetchPopularTv = async (): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/tv/popular`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};

function HomeScreen({navigation}: {navigation: any}) {

  const popularMoviesQuery = useQuery({
    queryKey: ['popular-movies'],
    queryFn: fetchPopularMoves,
  })
  const nowPlayingMoviesQuery = useQuery({
    queryKey: ['now-playing-movies'],
    queryFn: nowPlayingMoves,
  })
  const topRatedMoviesQuery = useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: nowPlayingMoves,
  })

  const popularTvQuery = useQuery({
    queryKey: ['popular-tv'],
    queryFn: fetchPopularTv,
  })

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
          {
            popularMoviesQuery?.data?.results && <Slider data={popularMoviesQuery?.data?.results}/>
          }
          {!popularMoviesQuery.isLoading && !popularMoviesQuery.error && popularMoviesQuery.isSuccess && popularMoviesQuery?.data?.results.length > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular Movies" content={popularMoviesQuery?.data?.results} />
            </View>
          ) : null}
          {!nowPlayingMoviesQuery.isLoading && !nowPlayingMoviesQuery.error && nowPlayingMoviesQuery.isSuccess && nowPlayingMoviesQuery?.data?.results.length > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Now Playing Movies" content={nowPlayingMoviesQuery?.data?.results} />
            </View>
          ) : null}
          {!topRatedMoviesQuery.isLoading && !topRatedMoviesQuery.error && topRatedMoviesQuery.isSuccess && topRatedMoviesQuery?.data?.results.length > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Top Rated Movies" content={topRatedMoviesQuery?.data?.results} />
            </View>
          ) : null}
          {!popularTvQuery.isLoading && !popularTvQuery.error && popularTvQuery.isSuccess && popularTvQuery?.data?.results.length > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular TV's" content={popularTvQuery?.data?.results} />
            </View>
          ) : null}
        </ScrollView>
    </ SafeAreaView>
  );
}
export default memo(HomeScreen)