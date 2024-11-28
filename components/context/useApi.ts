import { useState, useCallback } from 'react';
import { ApiFunction, ApiResponse } from '../types/type';

export default function useApi<T, Args extends any[]>(apiFunc: ApiFunction<T, Args>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(async (...args: Args): Promise<ApiResponse<T>> => {
        setLoading(true);
        const response = await apiFunc(...args);
        setLoading(false);

        if (!response.ok) {
            setError(true);
            console.log("API response log", response);
        } else {
            setData(response.data);
            setError(false);
        }

        return response;
    }, [apiFunc]); 

    return { data, error, loading, request };
}
