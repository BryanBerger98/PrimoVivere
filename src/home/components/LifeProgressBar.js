import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { addYears, differenceInWeeks, differenceInDays, differenceInYears, differenceInCalendarWeeks } from 'date-fns';

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
    <View>
        <Text style={styles.title}>Life progression {progression}%</Text>
        <View style={styles.progressBarContainer}>
            <View style={{ backgroundColor:'rgb(248, 250, 252)', borderRadius: 50, height: 6, width: `${progression}%`}}></View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        color: 'rgb(248, 250, 252)',
        textAlign: 'center',
        margin: 20,
        fontWeight: 'bold',
        fontSize: 20
    },
    progressBarContainer: {
        height: 6,
        borderRadius: 50,
        backgroundColor: 'rgb(15, 23, 42)',
        marginVertical: 3
    },
    progressBar: {

    }
});