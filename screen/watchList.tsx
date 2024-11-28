import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, ActivityIndicator } from 'react-native';

import { Movie, ApiResponse } from '../components/types/type';
import { fetchWatchlist } from '../api/watchListApi';
import MovieCard from '../components/Card';

const MAX_ITEMS_PER_PAGE = 20;
const WatchListScreen = () => {
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
        const response: ApiResponse<Movie[]> = await fetchWatchlist(page);
 
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
                    <MovieCard 
                        movie={item} 
                        isInWatchlist={true}
                        toggleWatchlist={loadWatchlist} 
                    />
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
    }
});

export default WatchListScreen;
