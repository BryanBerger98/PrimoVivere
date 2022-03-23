import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddHabitButton from './components/AddHabitButton';
import EditHabit from './screens/EditHabit';
import Habits from './screens/Habits';

const Stack = createNativeStackNavigator();

export default function HabitsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={({ navigation, route }) => ({
        headerTitleAlign: 'left',
        headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'Nunito_700Bold'
        },
        headerBackTitleVisible: false,
        headerRight: () => route.name === 'HabitsMain' && <AddHabitButton navigation={navigation} />
      })}>
        <Stack.Screen name='HabitsMain' options={{title: 'Habits'}} component={Habits} />
      </Stack.Group>
      <Stack.Group screenOptions={{
        presentation: 'modal',
        headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'Nunito_700Bold'
        }
      }}>
        <Stack.Screen name='HabitsEdit' options={{title: 'Habits'}} component={EditHabit} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
