import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInWeeks } from 'date-fns';


export default function WeeksPass({ userData }) {
  return (
    <View style={styles.container}>
        <Text style={styles.value}>{differenceInWeeks(new Date(), userData.birthDate.fullDate)}</Text>
        <Text style={styles.label}>weeks from your birth</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    label: {
        color: 'rgb(248, 250, 252)',
        fontSize: 20,
        marginLeft: 10
    },
    value: {
        color: 'rgb(248, 250, 252)',
        fontSize: 28,
        fontWeight: 'bold'
    }
});