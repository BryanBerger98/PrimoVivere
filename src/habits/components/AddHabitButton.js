import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable } from 'react-native';

export default function AddHabitButton({ navigation }) {

    const onGoToEditHabitScreen = () => {
        navigation.navigate('Habits', {screen: 'HabitsEdit'})
    };

  return (
    <Pressable onPress={onGoToEditHabitScreen}>
        <FontAwesomeIcon icon={['far', 'plus']} size={18} color='rgb(14, 165, 233)' />
    </Pressable>
  )
}
