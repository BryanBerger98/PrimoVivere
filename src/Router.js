import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import Home from './/home/screens/Home';
import Signup from './auth/screens/Signup';
import Signin from './auth/screens/Signin';
import Account from './account/screens/Account';
import { useAuthContext } from './auth/context/AuthContext';
import TabBar from './navigation/Tabs/TabBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TabHeader from './navigation/Tabs/TabHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AccountNavigator from './account/AccountNavigator';
import HabitsNavigator from './habits/HabitsNavigator';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(14, 165, 233)',
    background: 'rgb(30, 41, 59)',
    card: 'rgb(15, 23, 42)',
    text: 'rgb(226, 232, 240)',
    border: ' rgb(51, 65, 85)',
    notification: 'rgb(248, 250, 252)',
  },
};

export default function Router() {

    const authContext = useAuthContext();

    return(
        <SafeAreaProvider>
            <NavigationContainer theme={MyTheme}>
                { authContext.currentUser ?
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = focused ? ['fas', 'house'] : ['far', 'house'];
                                } else if (route.name === 'Account') {
                                    iconName = focused ?  ['fas', 'user'] : ['far', 'user'];
                                } else if (route.name === 'Habits') {
                                    iconName = focused ? ['fas', 'clock-three'] : ['far', 'clock-three'];
                                }
                                return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: 'rgb(248, 250, 252)', // rgb(14, 165, 233) = blue || rgb(248, 250, 252) = white
                            tabBarInactiveTintColor: 'rgb(148, 163, 184)',
                            tabBarStyle: styles.tabsContainer,
                            headerTitleAlign: 'left',
                            headerTitleStyle: {
                                fontSize: 25,
                                fontWeight: 'bold',
                                fontFamily: 'Nunito_700Bold'
                            }
                        })}
                        tabBar={props => <TabBar {...props} />}
                    >
                        <Tab.Screen name='Home' options={{tabBarShowLabel: false, title: 'Primo Vivere'}} component={Home} />
                        <Tab.Screen name='Habits' options={{tabBarShowLabel: false, headerShown: false}} component={HabitsNavigator} />
                        <Tab.Screen name='Account' options={{tabBarShowLabel: false, headerShown: false}} component={AccountNavigator} />
                        {/* getComponent={() => require('./account/AccountNavigator').default} */}
                    </Tab.Navigator>
                :
                    <Stack.Navigator>
                        <Stack.Screen name='Signup' component={Signup} />
                        <Stack.Screen name='Sign in' component={Signin} />
                    </Stack.Navigator>
            }
            </NavigationContainer>
        </SafeAreaProvider>
    )

}

const styles = StyleSheet.create({
    tabsContainer: {
        backgroundColor: 'rgb(15, 23, 42)',
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        paddingBottom: 0,
        height: 60
    }
});