import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated, ActionSheetIOS } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { Platform } from 'expo-modules-core';
import { useHabitsContext } from '../context/HabitsContext';

export default function HabitCard({ habit, navigation }) {

    const habitContext = useHabitsContext();

    const onClickHabit = () => {
        navigation.navigate('Habits', {screen: 'HabitsEdit', params: {habit}})
    }

    const onPressDeleteButton = () => {
        if (Platform.OS === 'ios') {
            return ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ['Cancel', 'Delete'],
                  destructiveButtonIndex: 1,
                  cancelButtonIndex: 0,
                  userInterfaceStyle: 'dark',
                },
                buttonIndex => {
                  if (buttonIndex === 1) {
                    habitContext.deleteHabit(habit.id).catch(console.error);
                  }
                }
            );
        }
    }

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <RectButton style={styles.leftAction} onPress={onPressDeleteButton}>
            <Animated.Text
              style={[
                styles.actionText,
                // {
                //   transform: [{ translateX: trans }],
                // },
              ]}>
              {/* <FontAwesomeIcon icon={['far', 'trash']} color='#F8FAFF' size={20} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }} /> */}
              Delete
            </Animated.Text>
          </RectButton>
        );
      }

  return (
    <Swipeable renderRightActions={renderRightActions}>
        <Pressable style={styles.container} onPress={onClickHabit}>
            <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                <LinearGradient colors={['#E879F9', '#86198F']} start={{x: -0.2, y: 0.5}} end={{x: 0.5, y: 1.2}} style={{borderRadius: 10, height: 55, width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <FontAwesomeIcon icon={['far', 'face-sleeping']} size={24} color='#F8FAFF' />
                </LinearGradient>
                <View style={{height: '100%', marginLeft: 20, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.title}>{habit.title}</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={[styles.description, { color: habit.control === 'positive' ? '#22C55E' : habit.control === 'negative' ? '#F43F5E' : '#94A3B8'}]}>{habit.control[0].toUpperCase() + habit.control.substring(1)}</Text>
                            {/* <Text style={[styles.description, {marginLeft: 5}]}>6 habits linked</Text> */}
                        </View>
                    </View>
                    {/* <View style={styles.tagsContainer}>
                        <Text style={styles.tag}>#sleep</Text>
                        <Text style={styles.tag}>#lifestyle</Text>
                    </View> */}
                </View>
            </View>
            <FontAwesomeIcon icon={['far', 'chevron-right']} style={{color: '#F8FAFF'}} size={13} />
        </Pressable>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(15, 23, 42)',
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        marginBottom: 10
    },
    title: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 16,
        color: '#F8FAFF'
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    description : {
        fontSize: 11,
        color: '#94A3B8',
        fontFamily: 'Nunito_400Regular'
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {
        color: 'rgb(14, 165, 233)',
        marginRight: 5,
        fontSize: 11,
        fontFamily: 'Nunito_400Regular'
    },
    leftAction: {
        backgroundColor: '#F43F5E',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginLeft: 5
    },
    actionText: {
        color: '#F8FAFF',
        paddingHorizontal: 10
    }
});