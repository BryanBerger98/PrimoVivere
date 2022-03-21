import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

export default function EditProfileElementButton({ navigation, title, screenToDisplay }) {

    const onPress = () => {
        navigation.navigate(screenToDisplay);
    }

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#F8FAFF', marginLeft: 0, fontSize: 16}}>{title}</Text>
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
