import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Movie, RootStackParamList } from './types/type';
import { modifyWatchlist } from '../api/watchListApi';
import { AddCircle, MinusCirlce } from "iconsax-react-native"
import Colors from '../assets/Colors';

type MovieDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

interface Props {
    movie: Movie;
    isInWatchlist: boolean;
    toggleWatchlist: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, isInWatchlist, toggleWatchlist }) => {
    const navigation = useNavigation<MovieDetailsNavigationProp>();
    const [onWatchlist, setOnWatchlist] = useState(isInWatchlist);

    useEffect(() => {
        setOnWatchlist(isInWatchlist);
    }, [isInWatchlist]);

    const handleWatchlistToggle = async () => {
        const newStatus = !onWatchlist;
        const response = await modifyWatchlist(movie.id, newStatus);
        if (response.ok) {
            setOnWatchlist(newStatus);
            toggleWatchlist();
        }
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: movie.id })} style={styles.card}>
            <View style={styles.row}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.cover} />
                <View style={styles.details}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.info}>Release Date: {movie.release_date}</Text>
                    <Text style={styles.info}>Rating: {movie.vote_average}/10</Text>
                </View>
                <TouchableOpacity style={styles.watchlistButton} onPress={handleWatchlistToggle}>
                    {onWatchlist ? (
                        <View style={{backgroundColor: Colors.red, width: 100,height: 32, flexDirection: "row", justifyContent: "space-evenly", alignItems:"center", borderRadius: "5%"}}>
                            <Text style={[styles.info, {color: Colors.white, fontSize:14 }]}>Watch list</Text>
                            <MinusCirlce color={Colors.white} size={18} />

                        </View>
                    ) : (
                        <View style={{backgroundColor: Colors.success, width: 100,height: 32, flexDirection: "row", justifyContent: "space-evenly", alignItems:"center", borderRadius: "5%"}}>
                        <Text style={[styles.info, {color: Colors.white, fontSize:14 }]}>Watch list</Text>
                        <AddCircle color={Colors.white} size={18} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cover: {
        width: 70,
        height: 100,
        borderRadius: 4,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
    },
    watchlistButton: {
        padding: 10,
        flexDirection: "column-reverse",
        
    }
});

export default MovieCard;
