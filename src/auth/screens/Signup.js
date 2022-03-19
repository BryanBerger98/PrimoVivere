import { Text, View, Button, TextInput, StyleSheet, Pressable, Switch, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useUserContext } from "../../account/context/UserContext";

function Signup({ navigation }) {

    const authContext = useAuthContext();
    const userContext = useUserContext();

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters').required('Required'),
        confirmPassword: Yup.string().min(8, 'At least 8 characters').oneOf([Yup.ref('password'), null], 'Must match the password').required('Required'),
        termsCheck: Yup.boolean().oneOf([true], 'Required')
    });

    const onSubmitSignupForm = (values) => {
        authContext.signupUserWithEmailAndPassword(values.email, values.password)
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                return alert('A user is already registered with this email');
            }
            console.error(error.code, error.message);
        });
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formContainer}>
                    <Text style={styles.pageTitle}>Signup</Text>
                    <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        termsCheck: false
                    }}
                    validationSchema={SignupFormSchema}
                    onSubmit={onSubmitSignupForm}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                            <View style={styles.formContainer}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Email address</Text>
                                    <TextInput style={styles.textInput} keyboardType='email-address' textContentType={'emailAddress'} placeholder={'example@example.com'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('email')} onChangeText={handleChange('email')} value={values.email}/>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <TextInput style={styles.textInput} textContentType="newPassword" secureTextEntry={true} placeholder={'********'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('password')} onChangeText={handleChange('password')} value={values.password} />
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Confirm password</Text>
                                    <TextInput style={styles.textInput} textContentType="newPassword" secureTextEntry={true} placeholder={'********'} placeholderTextColor="rgb(100, 116, 139)" onBlur={handleBlur('confirmPassword')} onChangeText={handleChange('confirmPassword')} value={values.confirmPassword} />
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Switch onValueChange={(v) => setFieldValue('termsCheck', v)} value={values.termsCheck} style={{marginRight: 10}} />
                                    <Text style={styles.checkboxLabel}>I have read and agree to terms and conditions</Text>
                                </View>
                                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                </Pressable>
                                <Button title='Sign in' onPress={() => navigation.navigate('Sign in')}/>
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}
export default Signup;

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