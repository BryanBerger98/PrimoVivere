import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileCard({ currentUser, userData }) {
  return (
    currentUser && userData &&
    <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
            {
                currentUser.photoURL ?
                <Image source={{uri: currentUser.photoURL}} style={styles.image} />
                : 
                <View style={[styles.image, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:'#1E293B'}]}>
                    <FontAwesomeIcon icon={['far', 'camera']} color='#F8FAFF' size={24}/>
                </View>
            }
            <View style={{marginLeft: 20, flexDirection: 'column'}}>
                <Text style={styles.userName}>{currentUser.displayName && currentUser.displayName !== '' ? currentUser.displayName : 'No name'}</Text>
                <View style={{marginTop: 10, flexDirection: 'column'}}>
                    <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 16, color: '#F8FAFF'}}>Born the</Text>
                    <Text style={{fontFamily: 'Nunito_700Bold', fontSize: 16, color: '#F8FAFF'}}>{`${userData.birthDate.date} ${userData.birthDate.monthStr} ${userData.birthDate.year}`}</Text>
                </View>
            </View>
        </View>
        <View style={{flexDirection: 'column', marginTop: 20}}>
            <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 16, color: '#F8FAFF'}}>{currentUser.email}</Text>
            {currentUser.phoneNumber && <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 16, color: '#F8FAFF'}}>{currentUser.phoneNumber}</Text>}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgb(15, 23, 42)',
        padding: 20,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10
    },
    imageContainer: {

    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 15
    },
    userName: {
        color: '#F8FAFF',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginTop: 10
    }
});