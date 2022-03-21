import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

export default function EditProfileButton({ onPress }) {

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesomeIcon icon={['far', 'user-pen']} style={{color: '#F8FAFF'}} size={18} />
                <Text style={{color: '#F8FAFF', marginLeft: 10, fontSize: 16}}>Edit profile</Text>
            </View>
            <FontAwesomeIcon icon={['far', 'chevron-right']} style={{color: '#F8FAFF'}} size={13} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(15, 23, 42)',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        marginBottom: 10
    }
});
