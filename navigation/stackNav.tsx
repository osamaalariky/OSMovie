import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screen/profile';
import TabNav from '../navigation/TabNav';
import MovieDetails from '../screen/movieDetails';
import { RootStackParamList } from '../components/types/type';
import routes from './routes';
import HomeScreen from '../screen/home';
import WatchListScreen from '../screen/watchList';
import RatedListScreen from '../screen/ratedList';

const Stack = createNativeStackNavigator<RootStackParamList>();



const stackNav = React.memo((props) => {
  return (

        <Stack.Navigator initialRouteName={routes.MAIN_SCREEN}>
            <Stack.Screen name={routes.MAIN_SCREEN} component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name={routes.PROFILE} component={Profile} options={{ headerTitle: 'Details' }} />
            <Stack.Screen name={routes.MOVIEDETAILS} component={MovieDetails} options={{ headerTitle: 'Movie Details' }} />
        </Stack.Navigator>
  )
})

const profileStack = React.memo((props) => {
    return (
  
          <Stack.Navigator initialRouteName={routes.PROFILE}>
              <Stack.Screen name={routes.PROFILE} component={Profile} options={{headerShown: false}} />
              <Stack.Screen name={routes.WATCHLIST} component={WatchListScreen} options={{ headerTitle: 'Details' }} />
              <Stack.Screen name={routes.RatedList} component={RatedListScreen} options={{ headerTitle: 'Details' }} />
              <Stack.Screen name={routes.MOVIEDETAILS} component={MovieDetails} options={{ headerTitle: 'Details' }} />
          </Stack.Navigator>
    )
  })

export {stackNav, profileStack};