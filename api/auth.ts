import { apiClient } from './client';
import { RequestTokenResponse, ValidateTokenResponse, SessionResponse } from '../components/types/type';

export async function getRequestToken() {
    const response = await apiClient.get<RequestTokenResponse>('/authentication/token/new');
    if (response.ok && response.data?.success) {
        return response.data.request_token;
    } else {
        throw new Error(`Failed to fetch request token: ${response.problem}`);
    }
}

export async function authenticateToken(username: string, password: string, requestToken: string) {
    const response = await apiClient.post<ValidateTokenResponse>('/authentication/token/validate_with_login', {
        username,
        password,
        request_token: requestToken
    });
    if (response.ok && response.data?.success) {
        return response.data.request_token;
    } else {
        throw new Error('Authentication failed');
    }
}

export async function createSession(requestToken: string) {
    const response = await apiClient.post<SessionResponse>('/authentication/session/new', {
        request_token: requestToken
    });
 
    if (response.ok && response.data?.success) {
        return response.data.session_id;
    } else {
        throw new Error('Failed to create session');
    }
}
