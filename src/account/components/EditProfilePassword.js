import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function EditProfilePassword({ navigation }) {

    const authContext = useAuthContext();

    const UpdatePasswordFormSchema = Yup.object().shape({
        currentPassword: Yup.string().min(8, 'At least 8 characters').required('Required'),
        newPassword: Yup.string().min(8, 'At least 8 characters').notOneOf([Yup.ref('currentPassword'), null], 'Must be different of the current password').required('Required'),
        confirmNewPassword: Yup.string().min(8, 'At least 8 characters').oneOf([Yup.ref('newPassword'), null], 'Must match the new password').required('Required')
    });

    const onSubmitUpdatePasswordForm = (values) => {
        authContext.updateCurrentUserPassword(values.currentPassword, values.newPassword)
        .then(() => {
            navigation.goBack();
        })
        .catch(error => {
            if (error.code === 'auth/wrong-password') {
                return alert('Wrong password');
            }
            if (error.code === 'auth/email-already-in-use') {
                return alert('A user is already registered with this email');
            }
            console.error(error.code, error.message);
        });
    }

  return (
    <View>
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            }}
            validationSchema={UpdatePasswordFormSchema}
            onSubmit={onSubmitUpdatePasswordForm}
            >
                {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                    <View style={styles.formContainer}>
                        <TextInput style={styles.input} textContentType="newPassword" secureTextEntry={true} placeholder={'Current password'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('currentPassword')} onChangeText={handleChange('currentPassword')} value={values.currentPassword} />
                        <TextInput style={styles.input} textContentType="newPassword" secureTextEntry={true} placeholder={'New password'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('newPassword')} onChangeText={handleChange('newPassword')} value={values.newPassword} />
                        <TextInput style={styles.input} textContentType="newPassword" secureTextEntry={true} placeholder={'Confirm new password'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('confirmNewPassword')} onChangeText={handleChange('confirmNewPassword')} value={values.confirmNewPassword} />
                        <Button title='Save' onPress={handleSubmit}/>
                    </View>
                )}
            </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20
    },
    input: {
        backgroundColor: 'rgb(15, 23, 42)',
        paddingHorizontal: 20,
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