import { ApiResponse, Movie, MovieApiResponse } from '../components/types/type';
import { apiClient } from "./client";

export const latestMovies = async (page: number, timeWindow: string): Promise<ApiResponse<Movie[]>> => {
    const endPoint = `trending/movie/${timeWindow}?language=en-US&page=${page}`; 
    const response = await apiClient.get<MovieApiResponse>(endPoint);
    
    if (response.ok && response.data && response.data.results) {
        return {
            ok: true,
            data: response.data.results.map((item: Movie) => ({
                id: item.id,
                title: item.title,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                release_date: item.release_date
            }))
        };
    } else {
        console.error('API call error:', response.problem);
        return { ok: false, data: [] };
    }
};
