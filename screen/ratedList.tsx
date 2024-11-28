
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { fetchRated } from '../api/ratingApi';
import { Movie, ApiResponse, RootStackParamList } from '../components/types/type';
import { StackNavigationProp } from '@react-navigation/stack';

type MovieDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;
const MAX_ITEMS_PER_PAGE = 20;
const RatedListScreen = () => {
    const navigation = useNavigation<MovieDetailsNavigationProp>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [listings, setListings] = useState<Movie[]>([]);
    const loadWatchlist = async () => {
        if (!hasMore || isFetching) return;
        setIsFetching(true);
        const response: ApiResponse<Movie[]> = await fetchRated(page);
        if (response.ok && response.data.length) {
            setListings(prev => [...prev, ...response.data]);
            setHasMore(response.data.length === MAX_ITEMS_PER_PAGE);
        } else {
            setHasMore(false);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        loadWatchlist();
    }, [page]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
                        <Card style={styles.card}>
                            <View style={styles.row}>
                                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.info}>Release Date: {item.release_date}</Text>
                                    <Text style={styles.info}>Average Rating: {item.vote_average}/10</Text>
                                </View>
                                <View style={styles.ratingBox}>
                                    <Text style={styles.rating}>{item.rating}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
                onEndReached={loadWatchlist}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetching ? <ActivityIndicator size="large" /> : null}
                ListEmptyComponent={<Text>{error || 'No movies found'}</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    card: {
        margin: 10,
        elevation: 3,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    info: {
        fontSize: 16,
        color: '#666',
    },
    ratingBox: {
        backgroundColor: 'green',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    rating: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default RatedListScreen;