import { apiClient } from './client';
import { ApiResponse, Movie, MovieApiResponse } from '../components/types/type';
import { getAccountId, getToken } from '../utility/storage';

export const modifyWatchlist = async ( movieId: number, watchlist: boolean): Promise<ApiResponse<any>> => {
    const accountId = await getAccountId() 
    const sessionId = await getToken();
    const data = {
        media_type: "movie",
        media_id: movieId,
        watchlist
    };
    return await apiClient.post<ApiResponse<any>>(`/account/${accountId}/watchlist?session_id=${sessionId}`, data);
};


export const fetchWatchlist = async (page?: number): Promise<ApiResponse<Movie[]>> => {
    const accountId = await getAccountId()
    const sessionId = await getToken();
    const endPoint = `account/${accountId}/watchlist/movies?session_id=${sessionId}&page${page}`
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
