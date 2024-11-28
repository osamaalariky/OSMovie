import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, ActivityIndicator, StyleSheet, FlatList, Button, Text, TextInput } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import useApi from '../components/context/useApi';
import { movieInfo, movieReview } from '../api/movieInfo';
import { fetchRated, postRating, deleteRating } from '../api/ratingApi';
import { MovieDetailsProps, MovieInfo, ApiResponse, Movie } from '../components/types/type';
import ReviewItem from '../components/reviews';

const MovieDetails: React.FC<MovieDetailsProps> = ({ route }) => {
    const { movieId } = route.params;
    const [userRating, setUserRating] = useState<number | null>(null);
    const [ratingInput, setRatingInput] = useState('');
    const [ratingError, setRatingError] = useState<string>('');

    const { data: movie, error: movieError, loading: movieLoading, request: fetchMovie } = useApi<MovieInfo, [number]>(movieInfo);
    const { data: reviews, error: reviewsError, loading: reviewsLoading, request: fetchReviews } = useApi<any, [number, number]>(movieReview);
    const { data: ratedMovies, error: ratedError, loading: ratedLoading, request: fetchRatedMovies } = useApi<Movie[], []>(fetchRated);

    useEffect(() => {
        const initFetch = async () => {
            await fetchMovie(movieId);
            await fetchReviews(movieId, 1);
            await fetchRatedMovies();
        };
        initFetch();
    }, [movieId]);

    useEffect(() => {
        if (ratedMovies) {
            const foundMovie = ratedMovies.find(m => m.id === movieId);
            if (foundMovie && typeof foundMovie.rating === 'number') {
                setUserRating(foundMovie.rating);
            } else {
                setUserRating(null);
            }
        }
    }, [ratedMovies, movieId]);

    const handleRating = async () => {
        const rating = parseFloat(ratingInput);
        if (isNaN(rating) || rating < 0.5 || rating > 10) {
            setRatingError('Please enter a valid rating between 0.5 and 10.');
            return;
        }
        const response: ApiResponse<any> = await postRating(movieId, rating);
        if (response.ok) {
            setUserRating(rating);
            setRatingInput(''); 
        } else {
            setRatingError('Failed to submit rating');
        }
    };

    const handleRemoveRating = async () => {
        const response: ApiResponse<any> = await deleteRating(movieId);
        if (response.ok) {
            setUserRating(null);
        } else {
            setRatingError('Failed to remove rating');
        }
    };

    if (movieLoading || reviewsLoading || ratedLoading) return <ActivityIndicator size="large" />;
    if (movieError || reviewsError || ratedError || !movie) return <Text>Failed to load details.</Text>;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }} style={styles.image} />
            <Text style={styles.textStyle}>Movie Details:</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{movie.title}</Title>
                    <Paragraph>Release Date: {movie.release_date}</Paragraph>
                    <Paragraph>Rating: {movie.vote_average}/10</Paragraph>
                    <Paragraph>{movie.overview}</Paragraph>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRatingInput}
                        value={ratingInput}
                        keyboardType="numeric"
                        placeholder="Enter your rating (0.5 - 10)"
                    />
                    {userRating !== null ? (
                        <>
                            <Button title="Remove Rating" onPress={handleRemoveRating} />
                            <Text>Your Rating: {userRating}</Text>
                        </>
                    ) : (
                        <Button title="Rate this Movie" onPress={handleRating} />
                    )}
                    {ratingError ? <Text style={styles.error}>{ratingError}</Text> : null}
                </Card.Content>
            </Card>
            <Text style={styles.textStyle}>Movie Reviews</Text>
            <Card style={[styles.card, { marginBottom: 22 }]}>
                <Card.Title title="Movie Reviews" />
                <FlatList
                    data={reviews}
                    keyExtractor={(item, index) => `review-${index}`}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                />
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
    },
    card: {
        margin: 8,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        fontSize: 14,
    }
});

export default MovieDetails;
