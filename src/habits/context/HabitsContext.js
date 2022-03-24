import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { doc, setDoc, updateDoc, getDoc, addDoc, collection, query, where, getDocs, documentId, deleteDoc } from 'firebase/firestore';
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
            const newHabit = {...habit, createdBy: userId, createdOn: new Date()};
            const response = await addDoc(collection(db, 'habits'), newHabit);
            setHabitsData([...habitsData, {...newHabit, id: response.id}]);
            return {...newHabit, id: response.id};
        } catch (error) {
            throw error;
        }
    });

    const updateHabit = useCallback(async (habitId, habit) => {
        try {
            const response = await updateDoc(doc(db, 'habits', habitId), {
                ...habit
            });
            const newHabitsArr = [...habitsData];
            const index = newHabitsArr.findIndex(el => el.id === habitId);
            newHabitsArr[index] = {...newHabitsArr[index], ...habit};
            setHabitsData([...newHabitsArr]);
            return newHabitsArr[index];
        } catch (error) {
            throw error;
        }
    });

    const getHabits = useCallback(async (userId) => {
        try {
            const response = await getDocs(query(collection(db, 'habits'), where('createdBy', '==', userId)));
            const data = [];
            response.forEach(doc => data.push({id: doc.id, ...doc.data()}));
            setHabitsData([...data]);
            return data;
        } catch (error) {
            throw error;
        }
    });

    const deleteHabit = useCallback(async (habitId) => {
        try {
            await deleteDoc(doc(db, 'habits', habitId));
            const newHabitsArr = [...habitsData];
            const index = newHabitsArr.findIndex(habit => habit.id === habitId);
            newHabitsArr.splice(index, 1);
            setHabitsData([...newHabitsArr]);
            return;
        } catch (error) {
            throw error;
        }
    });

    const contextValues = useMemo(() => ({habitsData, createHabit, getHabits, updateHabit, deleteHabit}), [habitsData, createHabit, getHabits, updateHabit, deleteHabit]);

    return(
        <HabitsContext.Provider value={contextValues}>
            {props.children}
        </HabitsContext.Provider>
    );

}
export default HabitsContextProvider;