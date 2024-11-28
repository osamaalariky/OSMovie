
import { apiClient } from './client';
import { ApiResponse, Movie, MovieApiResponse } from '../components/types/type';
import { getAccountId, getToken } from '../utility/storage';


export const postRating = async (movieId: number, rating: number): Promise<ApiResponse<any>> => {
    const accountId = await getAccountId();
    const sessionId = await getToken();
    const data = {
        value: rating
    };
    return await apiClient.post<ApiResponse<any>>(`/movie/${movieId}/rating?session_id=${sessionId}`, data);
};

export const deleteRating = async (movieId: number): Promise<ApiResponse<any>> => {
    const sessionId = await getToken();
    return await apiClient.delete<ApiResponse<any>>(`/movie/${movieId}/rating?session_id=${sessionId}`);
};


export const fetchRated = async (page?: number): Promise<ApiResponse<Movie[]>> => {
    const accountId = await getAccountId()
    const sessionId = await getToken();
    const endPoint = `account/${accountId}/rated/movies?session_id=${sessionId}&page${page}`
    const response = await apiClient.get<MovieApiResponse>(endPoint);
    if (response.ok && response.data && response.data.results) {
        return {
            ok: true,
            data: response.data.results.map((item: Movie) => ({
                id: item.id,
                title: item.title,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                release_date: item.release_date,
                rating : item.rating

            }))
        };
    } else {
        console.error('API call error:', response.problem);
        return { ok: false, data: [] };
    }
};