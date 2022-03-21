import React from 'react';
import { View } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';
import EditProfileElementButton from '../components/EditProfileElementButton';
import EditProfilePhoto from '../components/EditProfilePhoto';

export default function EditProfile({ navigation }) {

    const authContext = useAuthContext();

  return (
    <View>
        <EditProfilePhoto currentUser={authContext.currentUser} />
        <EditProfileElementButton title={authContext.currentUser.displayName ? authContext.currentUser.displayName : 'Username'} screenToDisplay='EditUsername' navigation={navigation} />
        <EditProfileElementButton title={authContext.currentUser.email} screenToDisplay='EditEmail' navigation={navigation} />
        {/* <EditProfileElementButton title={authContext.currentUser.phoneNumber ? authContext.currentUser.phoneNumber : 'Phone number'} /> */}
    </View>
  )
}
