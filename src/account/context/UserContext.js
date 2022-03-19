import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];
export const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const UserContext = createContext();
export { UserContext };

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext was used outside of its Provider');
    }
    return context;
};
export { useUserContext };

const UserContextProvider = props => {

    const [currentUserData, setCurrentUserData] = useState(null);

    const createUserData = useCallback(async (user) => {
        try {
            const response = await setDoc(doc(db, 'users', user.uid), {
                birthDate: null
            });
            return response;
        } catch (error) {
            throw error;
        }
    });

    const updateUserBirthDate = useCallback(async (userId, birthDate) => {
        try {
            const response = await updateDoc(doc(db, 'users', userId), {
                birthDate
            });
            return response;
        } catch (error) {
            throw error;
        }
    });

    const getUserData = useCallback(async (userId) => {
        try {
            const response = await getDoc(doc(db, 'users', userId));
            if (response.exists()) {
                return response.data();
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    })

    const contextValues = useMemo(() => ({currentUserData, createUserData, getUserData, updateUserBirthDate}), [currentUserData, createUserData, getUserData, updateUserBirthDate]);

    return(
        <UserContext.Provider value={contextValues}>
            {props.children}
        </UserContext.Provider>
    );

}
export default UserContextProvider;