import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditProfilePhoto from '../components/EditProfilePhoto';

export default function EditProfile() {
  return (
    <View>
        <Text style={{color: '#F8FAFF'}}>Edit profile</Text>
        <EditProfilePhoto />
    </View>
  )
}
