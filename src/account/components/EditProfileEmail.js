import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { useAuthContext } from '../../auth/context/AuthContext';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function EditProfileEmail({ navigation }) {

    const authContext = useAuthContext();

    const UpdateEmailFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters').required('Required')
    });

    const onSubmitUpdateEmailForm = (values) => {
        authContext.updateCurrentUserEmail(values.email, values.password)
        .then(() => {
            navigation.goBack();
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                return alert('Wrong email or password');
            }
            if (error.code === 'auth/wrong-password') {
                return alert('Wrong email or password');
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
                email: '',
                password: ''
            }}
            validationSchema={UpdateEmailFormSchema}
            onSubmit={onSubmitUpdateEmailForm}
            >
                {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                    <View style={styles.formContainer}>
                        <TextInput style={styles.input} keyboardType='email-address' textContentType={'emailAddress'} autoCapitalize='none' placeholder={'New email address'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('email')} onChangeText={handleChange('email')} value={values.email}/>
                        <TextInput style={styles.input} textContentType="newPassword" secureTextEntry={true} placeholder={'Password'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('password')} onChangeText={handleChange('password')} value={values.password} />
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