import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';
import EditProfilePhoto from '../components/EditProfilePhoto';

export default function EditProfile() {

    const authContext = useAuthContext();

  return (
    <View>
        <EditProfilePhoto currentUser={authContext.currentUser} />
    </View>
  )
}
