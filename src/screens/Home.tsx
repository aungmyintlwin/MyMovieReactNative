import React, { memo, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import {IPopularMovieResult} from '../types/popularmovie.result.model';

import List from '../components/List';

import {
  MOVIE_API_URL,
  AUTH_TOKEN
} from "../utils/constants";
import { useQuery } from '@tanstack/react-query';
import Slider from '../components/Slider';

import Icon from '@react-native-vector-icons/material-design-icons';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import Toast from 'react-native-toast-message';


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
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scaleHeight(15),
    left: scaleWidth(10)
  },
  search: {
    fontSize: scaleWidth(18),
    width: '80%',
    height: scaleHeight(45),
    backgroundColor: 'white',
    borderRadius: scaleWidth(5),
    marginRight: scaleWidth(5),
    padding: scaleWidth(5)
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
const upCommmingMoves = async (): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/upcoming`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};

function HomeScreen({navigation}: {navigation: any}) {

  const [searchQuery,setSearchQuery] = useState<string>('');
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
    queryFn: topRatedMoves,
  })

  const upCommingMoviesQuery = useQuery({
    queryKey: ['up-comming-movies'],
    queryFn: upCommmingMoves,
  })

  const searchMovies = () => {
    if(!searchQuery){
      Toast.show({
        type: 'error',
        text1: 'Search',
        text2: "Please enter title"
      });
    }else{
      navigation.navigate('Home',{ screen: 'SearchResult',params: {query: searchQuery}})
    }
  }
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
          {
            popularMoviesQuery?.data?.results && <Slider data={popularMoviesQuery?.data?.results}/>
          }
          <View
            style={styles.searchBar}
          >
            <TextInput
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              style={styles.search}
              placeholder='Enter Title or something...'
            />
            <Pressable onPress={searchMovies}>
              <Icon
                name={"movie-search"} 
                size={scaleWidth(45)} 
                color={"#e84dd3"}
              />
            </Pressable>
          </View>
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
          {!upCommingMoviesQuery.isLoading && !upCommingMoviesQuery.error && upCommingMoviesQuery.isSuccess && upCommingMoviesQuery?.data?.results.length > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Up Comming Movies" content={upCommingMoviesQuery?.data?.results} />
            </View>
          ) : null}
        </ScrollView>
    </ SafeAreaView>
  );
}
export default memo(HomeScreen)