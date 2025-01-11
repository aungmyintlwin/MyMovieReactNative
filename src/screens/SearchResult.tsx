import React, { memo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {IPopularMovieResult} from '../types/popularmovie.result.model';

import {
  MOVIE_API_URL,
  AUTH_TOKEN
} from "../utils/constants";
import { skipToken, useQuery } from '@tanstack/react-query';
import FavouriteList from '../components/FavouriteList';
import { scaleHeight } from '../utils/responsive';


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

interface SearchResultProps {
  navigation: any;
  route: any;
}

const fetchSearchMovies = async (query: string): Promise<IPopularMovieResult> => {
  const res = await fetch(`${MOVIE_API_URL}/search/movie?query=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  const data = await res.json();
  return data;
};

function SearchResult({navigation, route}: SearchResultProps) {
  const {query} = route.params;

  const fetchSearchMoviesQuery = useQuery({
    queryKey: ['search-movies'],
    queryFn: fetchSearchMovies ? () => fetchSearchMovies(query) : skipToken,
    enabled: !!fetchSearchMovies,
    retry: 0
  })

  return (
    <SafeAreaView style={styles.container}>
      {!fetchSearchMoviesQuery.isLoading && !fetchSearchMoviesQuery.error && fetchSearchMoviesQuery.isSuccess && fetchSearchMoviesQuery?.data?.results.length > 0 ? (
        <View style={styles.carousel}>
          <FavouriteList navigation={navigation} title={`Search for ${query}`} content={fetchSearchMoviesQuery?.data?.results} />
        </View>
      ) : null}
    </ SafeAreaView>
  );
}
export default memo(SearchResult)