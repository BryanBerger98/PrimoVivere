import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { addYears, differenceInWeeks, differenceInDays, differenceInYears, differenceInCalendarWeeks } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

export default function LifeProgressBar({ userData }) {

    const [progression, setProgression] = useState(0);

    useEffect(() => {
        if (userData && userData.birthDate && userData.birthDate.fullDate) {
            const now = new Date();
            const ninety = addYears(userData.birthDate.fullDate, 90);
            const daysFromBirth = differenceInDays(now, userData.birthDate.fullDate);
            const daysFromBirthToNinety = differenceInDays(ninety, userData.birthDate.fullDate);
            const result = Math.round((daysFromBirth/daysFromBirthToNinety)*100);
            setProgression(result);
        }
    }, [userData]);

  return (
    <LinearGradient colors={['#FBBF24', '#92400E']} start={{x: -0.2, y: 0.25}} end={{x: 0.75, y: 1.2}} style={{borderRadius: 15, padding: 15}}>
        <Text style={styles.title}>Life time progression</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#F8FAFF', fontFamily: 'Nunito_700Bold'}}>{progression}%</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#F8FAFF', fontFamily: 'Nunito_700Bold'}}>To 90</Text>
        </View>
        <View style={styles.progressBarContainer}>
            <View style={{ backgroundColor:'rgb(248, 250, 252)', borderRadius: 50, height: 6, width: `${progression}%`}}></View>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    title: {
        color: 'rgb(248, 250, 252)',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Nunito_700Bold'
    },
    progressBarContainer: {
        height: 6,
        borderRadius: 50,
        backgroundColor: 'rgb(15, 23, 42)',
        marginVertical: 3
    }
});