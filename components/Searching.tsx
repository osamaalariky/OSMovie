import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar, Card, Text } from 'react-native-paper';
import useApi from '../components/context/useApi';
import searchMovies from '../api/search';
import SimpleMovieCard from './SimpleCard';
import { Movie } from './types/type';
import { SearchNormal1, CloseCircle } from "iconsax-react-native";

interface SearchingProps {
    onSearchActive: (isActive: boolean) => void;
}

const Searching: React.FC<SearchingProps> = ({ onSearchActive }) => {
    const [query, setQuery] = useState('');
    const { data: movies, error, loading, request: performSearch } = useApi<Movie[], [string, number]>(searchMovies);

    useEffect(() => {
        if (query.length > 1) {
            performSearch(query, 1);
            onSearchActive(true);
        } else {
            performSearch('', 1); 
            onSearchActive(false);
        }
    }, [query]);

    const handleClear = () => {
        setQuery('');
        performSearch('', 1); 
        onSearchActive(false);
    };

    return (
        <Card style={styles.container}>
            <Searchbar
                placeholder="Search movies..."
                onChangeText={setQuery}
                value={query}
                icon={() => <SearchNormal1 size={24} color="#666" />}
                clearIcon={() => <CloseCircle size={24} color="#666" onPress={handleClear} />}
                style={styles.searchbar}
            />
            {loading && <ActivityIndicator size="large" color="#6200ee" />}
            {error && <Text style={styles.error}>Failed to load results.</Text>}
            {!loading && query.length > 1 && (
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <SimpleMovieCard movie={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 3,
        shadowRadius: 2,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
    },
    searchbar: {
        margin: 10,
        elevation: 2,
    },
    list: {
        paddingBottom: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
    },
});

export default Searching;
