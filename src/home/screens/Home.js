import { Text, ScrollView, View } from "react-native";
import { useEffect, useState } from 'react';
import { days, months, useUserContext } from "../../account/context/UserContext";
import { useAuthContext } from "../../auth/context/AuthContext";
import BirthDayModal from "../components/BirthDayModal";
import DaysPass from "../components/DaysPass";
import WeeksPass from "../components/WeeksPass";
import YearsPass from "../components/YearsPass";
import MementoBoard from "../components/MementoBoard";
import LifeProgressBar from "../components/LifeProgressBar";

function Home({navigation}) {

    const authContext = useAuthContext();
    const userContext = useUserContext();

    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (authContext.currentUser) {
            userContext.getUserData(authContext.currentUser.uid)
            .then(data => {
                if (data && !data.birthDate) {
                    setModalVisible(true);
                }
                if (!data) {
                    userContext.createUserData(authContext.currentUser)
                    .then(userData => {
                        setModalVisible(true);
                    }).catch(console.error);
                };
                if (data) {
                    let newData = {...data};
                    if (data.birthDate && data.birthDate.seconds) {
                        const date = new Date(data.birthDate.seconds * 1000);
                        const birthDate = {
                            fullDate: date,
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
            }).catch(console.error);
        }
    }, [authContext, userContext, modalVisible]);

    return(
        <ScrollView>
            <View style={{margin: 20}}>
                {userData && <LifeProgressBar userData={userData} />}
                <Text style={{marginTop: 30, color: 'rgb(248, 250, 252)', fontFamily: 'Nunito_700Bold', fontSize: 20, marginBottom: 10}}>From your birth</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    {userData && <DaysPass userData={userData} />}
                    {userData && <WeeksPass userData={userData} />}
                    {userData && <YearsPass userData={userData} />}
                </View>
                {/* {userData && <MementoBoard userData={userData} />} */}
            </View>
            <BirthDayModal modalVisible={modalVisible} setModalVisible={setModalVisible} currentUser={authContext.currentUser} />
        </ScrollView>
    )

}
export default Home;