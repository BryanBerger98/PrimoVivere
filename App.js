import UserContextProvider from './src/account/context/UserContext';
import AuthContextProvider from './src/auth/context/AuthContext';
import Router from './src/Router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';

library.add(far, fas);

export default function App() {

  let [fontsLoaded] = useFonts({
    Nunito_400Regular, Nunito_500Medium, Nunito_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </AuthContextProvider>
  );
}