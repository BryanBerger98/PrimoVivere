import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInDays } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

export default function DaysPass({ userData }) {
  return (
    <LinearGradient colors={['#38BDF8', '#0C5985']} start={{x: -0.2, y: 0.5}} end={{x: 0.5, y: 1.2}} style={{borderRadius: 15, height: 100, width: 100}}>
        <View style={styles.container}>
            <Text style={styles.value}>{differenceInDays(new Date(), userData.birthDate.fullDate)}</Text>
            <Text style={styles.label}>Days</Text>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    label: {
        color: 'rgb(248, 250, 252)',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Nunito_700Bold'
    },
    value: {
        color: 'rgb(248, 250, 252)',
        fontSize: 28,
        fontFamily: 'Nunito_700Bold',
        textAlign: 'center'
    }
});