import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHabitsContext } from '../context/HabitsContext';
import { useAuthContext } from '../../auth/context/AuthContext';

export default function EditHabit({ navigation, route }) {

    const habitsContext = useHabitsContext();
    const authContext = useAuthContext();
    const [currentHabit, setCurrentHabit] = useState(null);

    const [isFrequencyPickerOpen, setIsFrequencyPickerOpen] = useState(false);
    const [isEveryPickerOpen, setIsEveryPickerOpen] = useState(false);

    const closePicker = (pickerRef) => {
        if (pickerRef === 'frequencyPicker') {
            setIsFrequencyPickerOpen(false);
        } else if (pickerRef === 'everyPicker') {
            setIsEveryPickerOpen(false);
        } else {
            setIsEveryPickerOpen(false);
            setIsFrequencyPickerOpen(false);
        }
    }

    const togglePicker = (pickerRef) => {
        if (pickerRef === 'frequencyPicker') {
            setIsFrequencyPickerOpen(!isFrequencyPickerOpen);
            closePicker('everyPicker');
        } else if (pickerRef === 'everyPicker') {
            setIsEveryPickerOpen(!isEveryPickerOpen);
            closePicker('frequencyPicker');
        }
    }

    useEffect(() => {
        closePicker();
    }, []);

    useEffect(() => {
        setCurrentHabit(route.params && route.params.habit ? route.params.habit : null);
    }, []);

    const habitFormSchema = Yup.object().shape({
        title: Yup.string(),
        notes: Yup.string(),
        control: Yup.string(),
        frequency: Yup.string(),
        every: Yup.string()
    });

    const onSubmitHabitForm = (values) => {
        if (route.params && route.params.habit) {

            const newHabit = {
                ...route.params.habit,
                ...values
            };
            delete newHabit.id;
            habitsContext.updateHabit(route.params.habit.id, newHabit)
            .then(() => {
                navigation.navigate('Habits', {screen: 'HabitsMain'});
            }).catch(console.error);
        } else {
            habitsContext.createHabit(values, authContext.currentUser.uid)
            .then(() => {
                navigation.navigate('Habits', {screen: 'HabitsMain'});
            }).catch(console.error);
        }
    }

  return (
    <Formik
        initialValues={{
            title: currentHabit ? currentHabit.title : '',
            notes: currentHabit ? currentHabit.notes : '',
            control: currentHabit ? currentHabit.control : '',
            frequency: currentHabit ? currentHabit.frequency : 'Daily',
            every: currentHabit ? currentHabit.every : '1 day'
        }}
        validationSchema={habitFormSchema}
        onSubmit={onSubmitHabitForm}
        enableReinitialize={true}
    >
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
            <View style={styles.centeredView}>
                <View style={styles.inputGroup}>
                    <TextInput placeholder='Title' style={styles.input} placeholderTextColor="#94A3B8" onChangeText={handleChange('title')} value={values.title} />
                    <View style={styles.divider}></View>
                    <View style={{height: 120}}>
                        <TextInput placeholder='Notes' multiline={true} numberOfLines={4} style={styles.input} placeholderTextColor="#94A3B8" onChangeText={handleChange('notes')} value={values.notes} />
                    </View>
                </View>
                <View style={{marginVertical: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <View style={{ width: '50%', paddingRight: 5 }}>
                        <Pressable style={styles.controlButton} onPress={() => setFieldValue('control', 'positive')}>
                            <FontAwesomeIcon icon={['far', 'plus']} color={values.control === 'positive' ? '#22C55E' : '#94A3B8'} size={16} />
                            <Text style={{ marginLeft: 5, color: values.control === 'positive' ? '#22C55E' : '#94A3B8' }}>Positive</Text>
                        </Pressable>
                    </View>
                    <View style={{ width: '50%', paddingLeft: 5 }}>
                        <Pressable style={styles.controlButton} onPress={() => setFieldValue('control', 'negative')}>
                            <FontAwesomeIcon icon={['far', 'minus']} color={values.control === 'negative' ? '#F43F5E' : '#94A3B8'} size={16} />
                            <Text style={{ marginLeft: 5, color: values.control === 'negative' ? '#F43F5E' : '#94A3B8' }}>Negative</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Pressable style={[styles.input, {justifyContent: 'space-between'}]} onPress={() => togglePicker('frequencyPicker')}>
                        <Text style={{color: '#F8FAFF'}}>Frequency</Text>
                        <Text style={{color: '#94A3B8'}}>{values.frequency}</Text>
                    </Pressable>
                    <Picker style={{display: isFrequencyPickerOpen ? 'flex' : 'none'}} onValueChange={handleChange('frequency')} selectedValue={values.frequency} itemStyle={{ color: '#F8FAFF' }}>
                        <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Weekly" value="Weekly" />
                    </Picker>
                    <View style={styles.divider}></View>
                    <Pressable style={[styles.input, {justifyContent: 'space-between'}]} onPress={() => togglePicker('everyPicker')}>
                        <Text style={{color: '#F8FAFF'}}>Every</Text>
                        <Text style={{color: '#94A3B8'}}>{values.every}</Text>
                    </Pressable>
                    {
                        isEveryPickerOpen && values.frequency && values.frequency === 'Daily' ?
                            <Picker onValueChange={handleChange('every')} selectedValue={values.every} itemStyle={{ color: '#F8FAFF' }}>
                                <Picker.Item label="1 day" value="1 day" />
                                <Picker.Item label="2 days" value="2 days" />
                                <Picker.Item label="3 days" value="3 days" />
                            </Picker>
                        : isEveryPickerOpen && values.frequency && values.frequency === 'Weekly' ?
                            <Picker onValueChange={handleChange('every')} selectedValue={values.every} itemStyle={{ color: '#F8FAFF' }}>
                                <Picker.Item label="1 week" value="1 week" />
                                <Picker.Item label="2 weeks" value="2 weeks" />
                                <Picker.Item label="3 weeks" value="3 weeks" />
                            </Picker>
                        : null
                    }
                </View>
                <Button title='Save' onPress={handleSubmit}/>
            </View>
        )}
    </Formik>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: '100%',
        width: '100%',
        padding: 20
    },
    divider: {
        borderBottomColor: '#94A3B8',
        borderBottomWidth: 0.25,
        marginBottom: 5,
        marginLeft: 20
    },
    inputGroup: {
        backgroundColor: '#0F172A',
        borderRadius: 10,
        marginBottom: 10
    },
    input: {
        flexDirection: 'row',
        minHeight: 40,
        color: '#F8FAFF',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    controlButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        padding: 10,
        borderRadius: 10,
        height: 40
    }
});