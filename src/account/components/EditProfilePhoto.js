import React from 'react';
import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
// import { ImagePicker } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import { useFilesContext } from '../../files/context/FilesContext';
import { useAuthContext } from '../../auth/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function EditProfilePhoto({ currentUser }) {

    const filesContext = useFilesContext();
    const authContext = useAuthContext();

    const _pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [1, 1]
        });

        if (!result.cancelled) {
            if (currentUser && currentUser.photoURL && currentUser.photoURL !== '') {
                filesContext.deleteFile(currentUser.photoURL)
                .then(() => {
                    _uploadPhotoAndUpdateCurrentUser(result).catch(console.error);
                }).catch(console.error);
            } else {
                _uploadPhotoAndUpdateCurrentUser(result).catch(console.error);
            }
        }

    }

    const _uploadPhotoAndUpdateCurrentUser = async (file) => {
        try {
            const status = await filesContext.uploadFile(file, 'images/users/');
            await authContext.updateCurrentUserProfilePhoto(status.downloadURL);
            return status;
        } catch (error) {
            throw error;
        }
    }

  return (
    <Pressable style={styles.card} onPress={_pickImage}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {
                    currentUser.photoURL ?
                    <Image source={{uri: currentUser.photoURL}} style={styles.image} />
                    : 
                    <View style={[styles.image, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:'#1E293B'}]}>
                        <FontAwesomeIcon icon={['far', 'camera']} color='#F8FAFF' size={16}/>
                    </View>
                }
                <Text style={styles.label}>Change profile photo</Text>
            </View>
            <FontAwesomeIcon icon={['far', 'chevron-right']} color='#F8FAFF' size={16}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgb(15, 23, 42)',
        padding: 10,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 10
    },
    label: {
        color: '#F8FAFF',
        marginLeft: 10,
        fontFamily: 'Nunito_700Bold',
        fontSize: 16
    }
});
