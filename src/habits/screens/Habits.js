import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';
import HabitCard from '../components/HabitCard';
import { useHabitsContext } from '../context/HabitsContext';

export default function Habits() {

    const habitsContext = useHabitsContext();
    const authContext = useAuthContext();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        habitsContext.getHabits(authContext.currentUser.uid)
        .then(data => {
            setHabits(data);
        }).catch(console.error);
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.habitsContainer}>
            {
                habits.map(habit => (
                    <HabitCard habit={habit} />
                ))
            }
        </ScrollView>
        <Pressable style={styles.addButton}>
            <FontAwesomeIcon icon={['far', 'plus']} size={24} color='#F8FAFF' />
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1
    },
    habitsContainer: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    addButton: {
        backgroundColor: 'rgb(14, 165, 233)',
        width: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: 0,
        right: 20
    }
});
