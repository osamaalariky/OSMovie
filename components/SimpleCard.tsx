import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie, RootStackParamList} from '../components/types/type';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type MovieDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

interface Props {
    movie: Movie;
}
const SimpleMovieCard: React.FC<Props> =({ movie }) => {
    const navigation = useNavigation<MovieDetailsNavigationProp>();
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'; 

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('MovieDetails', { movieId: movie.id })}>
            <Text style={styles.title}>{movie.title} ({releaseYear})</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontSize: 16,
    }
});

export default SimpleMovieCard;
