import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInDays } from 'date-fns';


export default function DaysPass({ userData }) {
  return (
    <View style={styles.container}>
        <Text style={styles.value}>{differenceInDays(new Date(), userData.birthDate.fullDate)}</Text>
        <Text style={styles.label}>days from your birth</Text>
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