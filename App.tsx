// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import LoginScreen from './screen/login';
import TabNav from './navigation/TabNav';
import ProfileScreen from './screen/profile';
import routes from './navigation/routes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const AppNavigator = () => {
  const { user } = useAuth(); // Now useAuth is used within a child of AuthProvider

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name={routes.MAIN_SCREEN} component={TabNav} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default App;
