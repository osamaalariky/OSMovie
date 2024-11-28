import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY: string = 'auth_token';
const USER_DETAILS_KEY = 'user_details';
const ACCOUNT_ID_KEY = 'account_id';

export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Saving token failed', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Fetching token failed', error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Removing token failed', error);
  }
};

export const storeUserDetails = async (userDetails: { username: string }): Promise<void> => {
    try {
        await AsyncStorage.setItem(USER_DETAILS_KEY, JSON.stringify(userDetails));
    } catch (error) {
        console.error('Saving user details failed', error);
    }
};

export const getUserDetails = async (): Promise<{ username: string } | null> => {
    try {
        const userDetails = await AsyncStorage.getItem(USER_DETAILS_KEY);
        return userDetails ? JSON.parse(userDetails) : null;
    } catch (error) {
        console.error('Fetching user details failed', error);
        return null;
    }
};

export const removeUserDetails = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(USER_DETAILS_KEY);
    } catch (error) {
        console.error('Removing user details failed', error);
    }
};

export const storeAccountId = async (accountId: string): Promise<void> => {
    await AsyncStorage.setItem(ACCOUNT_ID_KEY, accountId);
};

export const getAccountId = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(ACCOUNT_ID_KEY);
};

export const removeAccountId = async (): Promise<void> => {
    await AsyncStorage.removeItem(ACCOUNT_ID_KEY);
};