import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function HabitCard({ habit }) {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
            <LinearGradient colors={['#E879F9', '#86198F']} start={{x: -0.2, y: 0.5}} end={{x: 0.5, y: 1.2}} style={{borderRadius: 10, height: 55, width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesomeIcon icon={['far', 'face-sleeping']} size={24} color='#F8FAFF' />
            </LinearGradient>
            <View style={{height: '100%', marginLeft: 20, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View>
                    <Text style={styles.title}>{habit.title}</Text>
                    {/* <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>12/31/2022</Text>
                        <Text style={[styles.description, {marginLeft: 5}]}>6 habits linked</Text>
                    </View> */}
                </View>
                {/* <View style={styles.tagsContainer}>
                    <Text style={styles.tag}>#sleep</Text>
                    <Text style={styles.tag}>#lifestyle</Text>
                </View> */}
            </View>
        </View>
        <FontAwesomeIcon icon={['far', 'chevron-right']} style={{color: '#F8FAFF'}} size={13} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(15, 23, 42)',
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        marginBottom: 10
    },
    title: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 16,
        color: '#F8FAFF'
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    description : {
        fontSize: 11,
        color: '#94A3B8',
        fontFamily: 'Nunito_400Regular'
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {
        color: 'rgb(14, 165, 233)',
        marginRight: 5,
        fontSize: 11,
        fontFamily: 'Nunito_400Regular'
    }
});