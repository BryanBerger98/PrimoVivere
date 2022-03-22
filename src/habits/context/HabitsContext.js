import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];
export const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const HabitsContext = createContext();
export { HabitsContext };

const useHabitsContext = () => {
    const context = useContext(HabitsContext);
    if (context === undefined) {
        throw new Error('useHabitsContext was used outside of its Provider');
    }
    return context;
};
export { useHabitsContext };

const HabitsContextProvider = props => {

    const [habitsData, setHabitsData] = useState([]);

    const createHabit = useCallback(async (habit) => {
        try {
            const response = await setDoc(doc(db, 'habits'), habit);
            return response;
        } catch (error) {
            throw error;
        }
    });

    const updateHabit = useCallback(async (userId, habit) => {
        try {
            const response = await updateDoc(doc(db, 'habits', userId), {
                ...habit
            });
            return response;
        } catch (error) {
            throw error;
        }
    });

    const getHabits = useCallback(async (userId) => {
        try {
            const response = await getDoc(doc(db, 'habits', userId));
            if (response.exists()) {
                // setCurrentUserData(response.data());
                return response.data();
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    })

    const contextValues = useMemo(() => ({habitsData, createHabit, getHabits, updateHabit}), [habitsData, createHabit, getHabits, updateHabit]);

    return(
        <HabitsContext.Provider value={contextValues}>
            {props.children}
        </HabitsContext.Provider>
    );

}
export default HabitsContextProvider;