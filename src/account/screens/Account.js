import { Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { useAuthContext } from "../../auth/context/AuthContext";
import { useUserContext } from "../context/UserContext";
import { useState, useEffect } from 'react';
import ProfileCard from "../components/ProfileCard";
import EditProfileButton from "../components/EditProfileButton";
import ChangePasswordButton from "../components/ChangePasswordButton";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];
const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Account({ navigation }) {

    const authContext = useAuthContext();
    const { currentUserData } = useUserContext();

    const [userData, setUserData] = useState(null);

    const onSignout = () => {
        authContext.signoutUser()
        .catch(console.error);
    }

    const onNavigateToEditProfile = () => {
        navigation.navigate('Account', {screen: 'Edit'});
    }

    useEffect(() => {
        if (authContext.currentUser && currentUserData) {
            let newData = {...currentUserData};
            if (currentUserData.birthDate && currentUserData.birthDate.seconds) {
                const date = new Date(currentUserData.birthDate.seconds * 1000);
                const birthDate = {
                    day: days[date.getDay()],
                    date: date.getDate(),
                    month: date.getMonth() + 1,
                    monthStr: months[date.getMonth()],
                    year: date.getFullYear()
                }
                newData = {...newData, birthDate};
            }
            setUserData(newData);
        }
    }, []);

    return(
        <SafeAreaView>
            {/* <Text style={styles.title}>Account</Text> */}
            {/* {userData && userData.birthDate && <Text style={styles.birthDate}>{`${userData.birthDate.day} ${userData.birthDate.date} ${userData.birthDate.monthStr} ${userData.birthDate.year}`}</Text>} */}
            <ProfileCard currentUser={authContext.currentUser} userData={userData} />
            <EditProfileButton onPress={onNavigateToEditProfile} />
            <ChangePasswordButton />
            <Pressable style={styles.signoutButton} onPress={onSignout}>
                <Text style={styles.signoutButtonText}>Signout</Text>
            </Pressable>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: 'rgb(248, 250, 252)',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 36
    },
    birthDate: {
        fontSize: 24,
        color: 'rgb(248, 250, 252)',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 36
    },
    signoutButton: {
        marginVertical: 20
    },
    signoutButtonText: {
        color: 'rgb(244,63, 94)',
        textAlign: 'center',
        fontSize: 16
    }
});