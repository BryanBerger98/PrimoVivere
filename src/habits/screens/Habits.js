import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';
import HabitCard from '../components/HabitCard';
import { useHabitsContext } from '../context/HabitsContext';

export default function Habits({ navigation }) {

    const habitsContext = useHabitsContext();
    const authContext = useAuthContext();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        habitsContext.getHabits(authContext.currentUser.uid);
    }, []);

    useEffect(() => {
        console.log('REQUEST');
        setHabits([...habitsContext.habitsData]);
    }, [habitsContext]);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.habitsContainer}>
            {
                habits.map((habit, index) => (
                    <HabitCard key={'habit' + index} habit={habit} navigation={navigation} />
                ))
            }
        </ScrollView>
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
    }
});
