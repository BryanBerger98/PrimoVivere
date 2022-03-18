import AuthContextProvider from './src/auth/context/AuthContext';
import Router from './src/Router';
export default function App() {

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}