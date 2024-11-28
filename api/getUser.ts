
import { apiClient } from './client';
import { ApiResponse, UserDetail } from '../components/types/type';
import { getAccountId, getToken } from '../utility/storage';

export async function getAccountDetails() {
    const accountId = await getAccountId() 
    const sessionId = await getToken();

    const response = await apiClient.get<ApiResponse<UserDetail>>(`/account/${accountId}?session_id=${sessionId}`);

    if (response.ok && response.data) {
        return response.data;
    } else {
        throw new Error('Failed to fetch account details');
    }
}
