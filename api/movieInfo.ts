import { apiClient } from "./client";
import { MovieInfo, ApiResponse, MovieReviewResponse, ReviewApiResponse } from '../components/types/type';

interface NullableApiResponse<T> {
    ok: boolean;
    data: T | null;
    totalPages?: number;
}

const endPoint = "movie/";


export const movieInfo = async (movieId: number): Promise<ApiResponse<MovieInfo>> => {
    try {
        const response = await apiClient.get<MovieInfo>(`${endPoint}${movieId}`);
        if (response.ok && response.data) {
            return {
                ok: true,
                data: response.data
            };
        } else {
            return { ok: false, data: {} as MovieInfo };  
        }
    } catch (error) {
        console.error('API call error:', error);
        return { ok: false, data: {} as MovieInfo }; 
    }
};

export const movieReview = async (movieId: number, page: number = 1): Promise<MovieReviewResponse> => {
    const endPoint = `movie/${movieId}/reviews?page=${page}`;
    try {
        const response = await apiClient.get<ReviewApiResponse>(endPoint);
        if (response.ok && response.data) {
            return {
                ok: true,
                data: response.data.results,
                totalPages: response.data.total_pages,
            };
        } else {
            return { ok: false, data: [], totalPages: 0 }; 
        }
    } catch (error) {
        console.error('API call error:', error);
        return { ok: false, data: [], totalPages: 0 }; 
    }
};