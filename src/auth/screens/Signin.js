import React from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useAuthContext } from '../context/AuthContext';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function Signin({ navigation }) {

    const authContext = useAuthContext();

    const SigninFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters').required('Required')
    });

    const onSubmitSigninForm = (values) => {
        authContext.signinUserWithEmailAndPassword(values.email, values.password)
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                return alert('Wrong email or password');
            }
            if (error.code === 'auth/wrong-password') {
                return alert('Wrong email or password');
            }
            console.error(error.code, error.message);
        });
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.formContainer}>
                <Text style={styles.pageTitle}>Sign in</Text>
                <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SigninFormSchema}
                onSubmit={onSubmitSigninForm}
                >
                    {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                        <View style={styles.formContainer}>
                            <View style={styles.formGroup}>
                                <Text style={styles.inputLabel}>Email address</Text>
                                <TextInput style={styles.textInput} keyboardType='email-address' textContentType={'emailAddress'} placeholder={'example@example.com'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('email')} onChangeText={handleChange('email')} value={values.email}/>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <TextInput style={styles.textInput} textContentType="newPassword" placeholder={'********'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('password')} onChangeText={handleChange('password')} value={values.password} />
                            </View>
                            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>Sign in</Text>
                            </Pressable>
                            <Button title='Signup' onPress={() => navigation.navigate('Signup')}/>
                        </View>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    pageTitle: {
        textAlign: 'center',
        marginVertical: 96,
        fontWeight: 'bold',
        fontSize: 36,
        color: 'rgb(248, 250, 252)'
    },
    formContainer: {
        width: '100%'
    },
    formGroup: {
        marginHorizontal: 10,
    },
    checkboxContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxLabel: {
        color: 'rgb(248, 250, 252)',
    },
    inputLabel: {
        color: 'rgb(248, 250, 252)',
        marginBottom: 8,
        marginLeft: 5
    },
    textInput: {
        alignSelf: 'stretch',
        backgroundColor: 'rgb(15, 23, 42)',
        color: 'rgb(248, 250, 252)',
        padding: 16,
        marginBottom: 16,
        borderRadius: 10,
        
    },
    submitButton: {
        borderRadius: 10,
        color: 'rgb(248, 250, 252)',
        backgroundColor: 'rgb(14, 165, 233)',
        padding: 16,
        marginHorizontal: 10,
        marginBottom: 16,
        marginTop: 16
    },
    submitButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
});