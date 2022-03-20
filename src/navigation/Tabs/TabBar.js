import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

export default function TabBar(props) {
    return (
    <View style={styles.tabsArea}>
        <BottomTabBar {...props}/>
    </View>
  )
}

const styles = StyleSheet.create({
    tabsArea : {
        backgroundColor: 'rgb(30, 41, 59)',
        paddingHorizontal: 10,
        paddingBottom: 30
    }
});