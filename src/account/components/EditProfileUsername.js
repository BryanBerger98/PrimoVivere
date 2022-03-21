import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';

export default function EditProfileUsername({ navigation }) {

    const authContext = useAuthContext();
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(authContext.currentUser && authContext.currentUser.displayName ? authContext.currentUser.displayName : '');
    }, [authContext]);

    const onChangeText = (value) => {
        setUsername(value);
    }

    const onSaveUsername = () => {
        if (!username || username && username === '') {
            alert('Please enter a username.');
            return;
        }
        authContext.updateCurrentUserName(username)
        .then(() => {
            navigation.goBack();
        }).catch(console.error);
    }

  return (
    <View>
        <TextInput style={styles.input} placeholder='Username' placeholderTextColor="rgb(100, 116, 139)" onChangeText={onChangeText} value={username}></TextInput>
        <Button title='Save' onPress={onSaveUsername} />
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgb(15, 23, 42)',
        paddingHorizontal: 20,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        marginBottom: 10,
        color: 'rgb(248, 250, 252)',
    }
});