import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MovieDetail} from '../types/movie.detail.model';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';
import { ACCOUNT_ID, AUTH_TOKEN, MOVIE_API_URL, MOVIE_IMAGE_URL } from '../utils/constants';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import Icon from '@react-native-vector-icons/material-design-icons';
import Star from '../components/Star';

const height = Dimensions.get('screen').height;

const trailerVideo = require('../assets/videos/video.mp4');

const styles = StyleSheet.create({
  image: {
    height: height / 1.8,
    width: '100%',
    resizeMode: 'stretch',
  },
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  genre: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#f44336',
    color: 'white',
  },
  overview: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  releaseDate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  playButton: {
    padding: scaleHeight(10),
    borderRadius: scaleWidth(25),
    width: scaleWidth(50),
    position: 'absolute',
    top: scaleHeight(-45),
    right: scaleWidth(10),
    backgroundColor: '#f44336',
    elevation: 15,
  },
  favButton: {
    position: 'absolute',
    top: scaleHeight(-45),
    left: scaleWidth(10),
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

interface IDetailScreenProps {
  navigation: any;
  route: any;
}

const placeholderImage = require('../assets/images/placeholder.png');

const movieDetail = async (movieId: string): Promise<MovieDetail> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/${movieId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
};
type MovieFav = {
    media_id: number,
    media_type: string,
    favorite: boolean
  }
const addFavMovie = async (paramData: MovieFav): Promise<MovieDetail> => {
  console.log(paramData,'pdddd')
  const res = await fetch(`${MOVIE_API_URL}/account/${ACCOUNT_ID}/favorite`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(paramData)
  });

  const data = await res.json();
  return data;
};

 function DetailScreen({navigation, route}: IDetailScreenProps) {
  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [movie, setMovie] = useState<MovieDetail>({} as MovieDetail);

  const movieDetailQuery = useQuery({
    queryKey: ['movie-detail'],
    queryFn: id ? () => movieDetail(id) : skipToken,
    enabled: !!id,
    retry: 0
  })
  useEffect(() => {
    if(movieDetailQuery?.isSuccess){
      setMovie(movieDetailQuery?.data)
    }
  }, [id]);

  const movieMutation = useMutation({
    mutationFn: (data: MovieFav) => addFavMovie(data),
    onError: (error) => {
      // An error happened!
      // console.log(`err`,error?.status_message)
    },
    onSuccess: (data) => {
      // console.log(`err`,data?.status_message)
      console.log(data,'success')
      // Boom baby!
    },
  })


  return (
    <>
      {!movieDetailQuery?.isLoading && !movieDetailQuery?.isError && movieDetailQuery?.isSuccess ? (
        <View>
          {
            movie && <>
            <ScrollView>
              <Image
                source={
                  movie.poster_path
                    ? {uri: `${MOVIE_IMAGE_URL}/${movie?.poster_path}`}
                    : placeholderImage
                }
                style={styles.image}
              />
              <View style={styles.container}>
                <Icon 
                  onPress={() => {
                    movieMutation.mutate({ media_id: id, media_type: "movie", favorite: true })
                  }} 
                  style={styles.favButton} 
                  name={"heart"} 
                  size={scaleWidth(50)} 
                  color={false ? "#900" : '#f4f4f4'}
                />
                <View style={styles.playButton}>
                  <PlayButton setModalVisible={setModalVisible} />
                </View>
                <Text style={styles.title}>{movie.original_title}</Text>
                {movie.genres && movie.genres.length > 0 ? (
                  <View style={styles.genresContainer}>
                    {movie.genres.map(genre => (
                      <Text key={genre.id} style={styles.genre}>
                        {genre.name}
                      </Text>
                    ))}
                  </View>
                ) : null}
                <Star stars={movie.vote_average / 2}/>
                <Text style={styles.overview}>{movie.overview}</Text>
                <Text style={styles.releaseDate}>{`Release date: ${dateFormat(
                  movie.release_date,
                  'dd/mm/yyyy',
                )}`}</Text>
              </View>
            </ScrollView>
            </>
          }
          <Modal visible={modalVisible} animationType='slide'>
            <View style={styles.videoModal}>
                <VideoPlayer
                    onBack={() => setModalVisible(false)}
                    onEnd={() => setModalVisible(false)}
                    source={trailerVideo}
                    disableVolume={true}
                    navigator={navigation}
                    toggleResizeModeOnFullscreen={true}
                    fullScreenOrientation={'all'}
                />
            </View>
          </Modal>
        </View>
      ) : 
        <ActivityIndicator size={'large'} color={'red'} />
      }
    </>
  );
}
export default memo(DetailScreen)
