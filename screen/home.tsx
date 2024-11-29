import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import useApi from '../components/context/useApi';
import { Movie, ApiResponse } from '../components/types/type';
import { latestMovies } from '../api/latestMovie';
import MovieCard from '../components/Card';
import Searching from '../components/Searching';
import { fetchWatchlist } from '../api/watchListApi';
import { useNavigation } from '@react-navigation/native';

interface DropdownItem {
    label: string;
    value: string;
}

const MAX_ITEMS_PER_PAGE = 20;

export default function HomeScreen() {
    const navigation = useNavigation()
    const [page, setPage] = useState(1);
    const [timeWindow, setTimeWindow] = useState('week');
    const [listings, setListings] = useState<Movie[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [watchlist, setWatchlist] = useState<Set<number>>(new Set());
    const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());

    const data: DropdownItem[] = [
        { label: 'This Week', value: 'week' },
        { label: 'Today', value: 'day' }
    ];

    const fetchMovies = async () => {
        if (isFetching || !hasMore) return; 
        setIsFetching(true);
        const response = await latestMovies(page, timeWindow);
        if (response.ok && response.data.length) {
            setListings(prev => [...prev, ...response.data]);
            setPage(prevPage => prevPage + 1);
            setHasMore(response.data.length === MAX_ITEMS_PER_PAGE);
        } else {
            setHasMore(false);
        }
        setIsFetching(false);
    };
    
    useEffect(() => {
        fetchMovies(); 
    }, [timeWindow]); 
    
    useEffect(() => {
       
            setPage(1); 
            setListings([]); 
            
       
    }, []); 

    const loadWatchlist = async () => {
        const response = await fetchWatchlist(); 
        if (response.ok) {
            const ids = new Set(response.data.map(movie => movie.id));
            setWatchlistIds(ids);
        }
    };

    useEffect(() => {
        loadWatchlist();

    }, [ page]);

    const handleTimeWindowChange = (item: DropdownItem) => {
        setTimeWindow(item.value);
        setListings([]);  
        setPage(1); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searching onSearchActive={setSearchActive} />
            <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                value={timeWindow}
                onChange={handleTimeWindowChange}
                style={styles.dropdown}
            />
            {!searchActive && (
                <FlatList
                    data={listings}
                    renderItem={({ item }) => <MovieCard movie={item}  isInWatchlist={watchlistIds.has(item.id)} toggleWatchlist={loadWatchlist}/>}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    onEndReached={fetchMovies}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetching ? <ActivityIndicator size="large" /> : null}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    dropdown: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
});
