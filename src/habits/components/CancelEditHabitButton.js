import React from 'react';
import { Pressable, Text } from 'react-native';

export default function CancelEditHabitButton({ navigation }) {

    const onGoToEditHabitScreen = () => {
        navigation.navigate('Habits', {screen: 'HabitsMain'})
    };

  return (
    <Pressable onPress={onGoToEditHabitScreen}>
        <Text style={{ color: 'rgb(14, 165, 233)', fontSize: 16 }}>Cancel</Text>
    </Pressable>
  )
}
