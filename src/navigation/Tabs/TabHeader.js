import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabHeader(props) {
    return (
        <SafeAreaView style={styles.tabsArea}>
            {/* {console.log(props.route.name)} */}
            <Text style={styles.title}>{props.options.title}</Text>
        </SafeAreaView>
      )
    }
    
    const styles = StyleSheet.create({
        tabsArea : {
            backgroundColor: 'rgb(30, 41, 59)',
            paddingHorizontal: 20,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
        title: {
            color: 'rgb(248, 250, 252)',
            fontSize: 30,
            fontWeight: 'bold'
        }
    });