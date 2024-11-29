import { apiClient } from './client';
import {  AccountResponse } from '../components/types/type';

interface ApiResponse<T> {
    data: T;  
    success: boolean;
    status_message?: string;
    status_code?: number;
}

export const fetchAccountId = async (sessionId: string): Promise<AccountResponse> => {

    const url = `/account?api_key=${process.env.API_KEY}&session_id=${sessionId}`;
    const response = await apiClient.get<ApiResponse<AccountResponse>>(url);

    if (response.ok && response.data) {
        return response.data;  
    } else {

        throw new Error(response.problem || 'Failed to fetch account ID');
    }
};
