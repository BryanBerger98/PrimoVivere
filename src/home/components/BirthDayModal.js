import React from 'react';
import { SafeAreaView, StyleSheet, View, Modal, Pressable, Text, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { fr } from 'date-fns/locale'
import { useUserContext } from '../../account/context/UserContext';

export default function BirthDayModal({modalVisible, setModalVisible, currentUser}) {

    const userContext = useUserContext();
    const [birthDate, setBirthDate] = useState(new Date());

    const onSubmitBirthDate = async () => {
        try {
            const userData = userContext.updateUserBirthDate(currentUser.uid, birthDate);
            setModalVisible(!modalVisible);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please set your birth date</Text>
            <DatePicker textColor='#FFF' locale='fr' mode='date' date={birthDate} onDateChange={setBirthDate} />
            <Pressable
              style={styles.submitButton}
              onPress={() => onSubmitBirthDate()}
            >
              <Text style={styles.submitButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: '100%',
        width: '100%'
      },
      modalView: {
        backgroundColor: "rgb(30, 41, 59)",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        height: '100%',
        width: '100%',
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
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
        },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'rgb(248, 250, 252)',
        fontWeight: 'bold',
        fontSize: 28
      }
});