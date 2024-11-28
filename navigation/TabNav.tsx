import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {PlayCircle, ProfileCircle} from "iconsax-react-native"
import Colors from '../assets/Colors';
import routes from './routes';
import {profileStack, stackNav } from './stackNav';
const Tab = createBottomTabNavigator();

const TabNav = React.memo(() => {

  return (


<Tab.Navigator initialRouteName={routes.HOME}>

<Tab.Screen 
  name={routes.HOME} 
  component={stackNav} 
  options={{ 
    tabBarIcon: ( {size, }) => (
      <PlayCircle size={size} color={Colors.primary}/>
    )
  }}
/>
       <Tab.Screen name={routes.PROFILETAB} component={profileStack} options={{ 
    tabBarIcon: ({ color, size }) => (
      <ProfileCircle size={size} color={Colors.primary}/>
    )
  }} />
</Tab.Navigator>

  );
})

export default TabNav