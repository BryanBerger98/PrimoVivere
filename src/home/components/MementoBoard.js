import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { addYears, differenceInYears, differenceInCalendarWeeks } from 'date-fns';

export default function MementoBoard({userData}) {

    const [board, setBoard] = useState(null);

    useEffect(() => {
        if (userData && userData.birthDate && userData.birthDate.fullDate) {
            const now = new Date();
            const age = differenceInYears(now, userData.birthDate.fullDate);
            const b = [];
            for (let i = 0; i < 90; i++) {
                if (i < age) {
                    b.push({
                        pastWeeks: 52
                    });
                }
                if (i === age) {
                    const lastBirthDay = addYears(userData.birthDate.fullDate, age);
                    const pastWeeksFromLastBirthDay = differenceInCalendarWeeks(now, lastBirthDay);
                    b.push({
                        pastWeeks: pastWeeksFromLastBirthDay
                    });
                }
                if (i > age) {
                    b.push({
                        pastWeeks: 0
                    });
                }
            }
            setBoard(b);
        }
    }, [userData]);

  return (
    <View>
        <Text style={styles.title}>Primo Vivere</Text>
        {board && board.map((el, index) => (
            <View key={index.toString()} style={styles.progressBarContainer}>
                <View style={{ backgroundColor:'rgb(248, 250, 252)', borderRadius: 50, height: 6, width: `${(Math.round((el.pastWeeks / 52)*100))}%`}}></View>
            </View>
        ))}
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