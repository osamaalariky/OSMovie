import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRequestToken, authenticateToken, createSession } from '../../api/auth';
import { storeToken, removeToken, getToken, storeAccountId } from '../../utility/storage';
import { fetchAccountId } from '../../api/getAccountId';

interface User {
    username: string;
    sessionId: string;
    accountId: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            const sessionId = await getToken();
            if (sessionId) {
                await storeToken(sessionId);
                try {
                    const accountDetails = await fetchAccountId(sessionId);
                
                    await storeAccountId(accountDetails.id.toString());
                    setUser({
                        username: accountDetails.username,
                        sessionId,
                        accountId: accountDetails.id.toString(),
                        name: accountDetails.name,
                    });
                    setLoading(false);
                } catch (error: any) {
                    setError('Failed to initialize user session: ' + error.message);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const requestToken = await getRequestToken();
            const validatedToken = await authenticateToken(username, password, requestToken);
            const sessionId = await createSession(validatedToken);
         //   setAuthToken(sessionId);
            await storeToken(sessionId);
        
            const accountDetails = await fetchAccountId(sessionId);
     
            try {
                const accountDetails = await fetchAccountId(sessionId);

                setUser({
                    username: accountDetails.username,
                    sessionId,
                    accountId: accountDetails.id.toString(),
                    name: accountDetails.name,
                });
                await storeAccountId(accountDetails.id.toString())
                setLoading(false);
            } catch (detailError) {
                console.error("fetchAccountId Error:", detailError); 
                throw new Error('Failed to fetch account details: ' + (detailError || 'No error message available'));
            }
        } catch (error) {
            console.error("Login Process Error:", error); 
            setError('Login failed: ' + (error || 'Unknown error'));
            setLoading(false);
        }
    };
    

    const logout = async () => {
        await removeToken();
      //  setAuthToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};