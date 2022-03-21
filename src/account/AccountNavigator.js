import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Account from './screens/Account';
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'left',
      headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
          fontFamily: 'Nunito_700Bold'
      },
      headerBackTitleVisible: false
    }}>
      <Stack.Screen name='Profile' component={Account} />
      <Stack.Screen name='Edit' options={{headerTitle: 'Edit profile'}} component={EditProfile} />
    </Stack.Navigator>
  )
}
