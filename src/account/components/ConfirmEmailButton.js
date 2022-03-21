import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../../auth/context/AuthContext';

export default function ConfirmEmailButton() {

    const authContext = useAuthContext();

    const [emailVerificationCounter, setEmailVerificationCounter] = useState(0);
    const [sendingVerificationEmail, setSendingVerificationEmail] = useState(false);
    const [emailVerificationCounterInterval, setEmaiLVerificationCounterInterval] = useState(0);

    const onSendVerificationEmail = async () => {
        try {
            setSendingVerificationEmail(true);
            await authContext.sendUserVerificationEmail(authContext.currentUser.email);
            setSendingVerificationEmail(false);
            setEmailVerificationCounter(60);
            const interval = setInterval(() => {
                setEmailVerificationCounter(count => count - 1);
            }, 1000)
            setEmaiLVerificationCounterInterval(interval);
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                setEmailVerificationCounter(60);
                const interval = setInterval(() => {
                    setEmailVerificationCounter(count => count - 1);
                }, 1000)
                setEmaiLVerificationCounterInterval(interval);
                return;
              }
              console.error(error);
        }
    }

    useEffect(() => {
        if (emailVerificationCounter === 0) {
            clearInterval(emailVerificationCounterInterval);
            setEmaiLVerificationCounterInterval(0);
        }
    }, [emailVerificationCounter, emailVerificationCounterInterval]);

  return (
    <Pressable style={styles.button} onPress={onSendVerificationEmail} disabled={emailVerificationCounter > 0 || sendingVerificationEmail}>
        <LinearGradient colors={emailVerificationCounter > 0 || sendingVerificationEmail ? ['rgb(148, 163, 184)', 'rgb(51, 65, 85)'] : ['#38BDF8', '#0C5985']} start={{x: -0.2, y: 0.25}} end={{x: 0.75, y: 1.2}} style={{borderRadius: 10, padding: 15}}>
            <Text style={styles.title}>
                { sendingVerificationEmail ?
                    'Sending verification email...'
                    : emailVerificationCounter === 0 ?
                    'Confirm your email address'
                    :
                    `Wait ${emailVerificationCounter} before sending a new verification email`
                }
            </Text>
        </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 20,
        marginBottom: 10
    },
    title: {
        color: 'rgb(248, 250, 252)',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Nunito_700Bold'
    }
});