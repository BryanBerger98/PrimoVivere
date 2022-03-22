import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Habits from './screens/Habits';

const Stack = createNativeStackNavigator();

export default function HabitsNavigator() {
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
      <Stack.Screen name='HabitsMain' options={{title: 'Habits'}} component={Habits} />
    </Stack.Navigator>
  )
}
