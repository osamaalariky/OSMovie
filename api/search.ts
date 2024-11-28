import { ApiResponse, Movie, MovieApiResponse } from '../components/types/type';
import { apiClient } from "./client";

const searchMovies = async (query: string, page: number): Promise<ApiResponse<Movie[]>> => {
    const endPoint = `search/movie?language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
    try {
        const response = await apiClient.get<MovieApiResponse>(endPoint);  
     
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
        console.error('Search API error:', error);
        return { ok: false, data: [], totalPages: 0 };
    }
};

export default searchMovies;
