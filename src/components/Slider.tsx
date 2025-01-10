import React, { memo } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  MOVIE_IMAGE_URL
} from "../utils/constants";
import { IPopularMovie } from '../types/popularmovie.model';


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




const _renderItem = ({item, index}: {item: string; index: any}) => {
  return (
    <Image
      key={`${item}_${index}`}
      source={{uri: item}}
      style={styles.slideImage}
    />
  );
};

const _keyExtractor = (item: string) => item + Math.random() * 1000;

let _carousel: any = null;

type Props = {
    data: IPopularMovie[]
}
const Slider = (props: Props ) => {
    const { data } = props;
    const [moviesImages, setMoviesImages] = React.useState<string[]>([]);
    React.useEffect(() => {
        if (data?.length) {
        const images = data?.map(
            movie => `${MOVIE_IMAGE_URL}/${movie.poster_path}`,
        );
        setMoviesImages(images);
        }
    }, [data]);

    return (
        <View style={styles.sliderContainer}>
        <Carousel
            ref={c => {
            _carousel = c;
            }}
            activeSlideAlignment="center"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            inactiveSlideShift={0}
            contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
            containerCustomStyle={styles.sliderContainer}
            style={styles.slide}
            data={moviesImages}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            sliderWidth={dimension.width}
            itemWidth={dimension.width}
            sliderHeight={dimension.height / 1.5}
            autoplay={true}
            loop={true}
        />
        </View>
    );
}
export default memo(Slider);