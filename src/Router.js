import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './/home/screens/Home';
import Signup from './auth/screens/Signup';
import Signin from './auth/screens/Signin';
import Account from './account/screens/Account';
import { useAuthContext } from './auth/context/AuthContext';

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
        <NavigationContainer theme={MyTheme}>
        { authContext.currentUser ?
            <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                    } else if (route.name === 'Account') {
                    iconName = focused ?  'person' : 'person-outline'
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'rgb(248, 250, 252)',
                tabBarInactiveTintColor: 'rgb(148, 163, 184)',
                tabBarStyle: {
                    backgroundColor: 'rgb(15, 23, 42)'
                }
                })}
            >
                <Tab.Screen name='Home' options={{tabBarLabel: 'Home', title: 'Primo Vivere'}} component={Home} />
                <Tab.Screen name='Account' getComponent={() => require('./account/screens/Account').default} />
            </Tab.Navigator>
        :
            <Stack.Navigator>
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='Sign in' component={Signin} />
            </Stack.Navigator>
      }
      </NavigationContainer>
    )

}