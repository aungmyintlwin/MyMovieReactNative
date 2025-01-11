import React, { memo } from "react";
import { PropsWithChildren } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IPopularMovie } from "../types/popularmovie.model";
import { MOVIE_IMAGE_URL } from "../utils/constants";
import { scaleHeight, scaleWidth } from "../utils/responsive";

const styles = StyleSheet.create({
    container: {
        padding: scaleWidth(5),
        position: 'relative',
        alignItems: 'center',
        height: scaleHeight(150),
    },
    image: {
        width: scaleWidth(100),
        height: scaleHeight(150),
        borderRadius: scaleWidth(10),
    },
    movie_name: {
        position: 'absolute',
        width: scaleWidth(100),
        textAlign: 'center',
        top: scaleHeight(10)
    }
});

interface ICardProps extends PropsWithChildren<any> {
    item: IPopularMovie;
    navigation: any;
}

const placeholderImage = require('../assets/images/placeholder.jpeg');

const Card = (props: ICardProps) => {
    const {item, navigation} = props;

    return (
        <TouchableOpacity 
            style={styles.container}
            // onPress={() => navigation.navigate('Details', {id: item?.id})}
            onPress={() => navigation.navigate('Home',{ screen: 'Details',params: {id: item?.id}})}
        >
            <Image source={
                item.poster_path 
                ? {uri: `${MOVIE_IMAGE_URL}/${item?.poster_path}`}
                : placeholderImage
            } 
                style={styles.image}
            />
            {!item.poster_path ? (
                <Text style={styles.movie_name}>{item?.title}</Text>
            ) : null}
        </TouchableOpacity>
    )
}

export default memo(Card);