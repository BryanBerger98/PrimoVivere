import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { doc, setDoc, updateDoc, getDoc, addDoc, collection, query, where, getDocs, documentId } from 'firebase/firestore';
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

    const createHabit = useCallback(async (habit, userId) => {
        try {
            const response = await addDoc(collection(db, 'habits'), {...habit, createdBy: userId, createdOn: new Date()});
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
            const response = await getDocs(query(collection(db, 'habits'), where('createdBy', '==', userId)));
            const data = [];
            response.forEach(doc => data.push({id: doc.id, ...doc.data()}));
            return data;
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