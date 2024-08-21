import { useState } from 'react';
import useShowToast from './useShowToast';
import{collection, getDocs, query, where} from "firebase/firestore";
import { firestore } from '../firebase/firebase';

function useSearchUser() {
    const[user, setUser] = useState(null)
    const[isLoading, setLoading] = useState(false)
    const showToast = useShowToast()

    const getUserProfile = async (username) => {
        setLoading(true)
        setUser(null)
        try{
            const q = query(collection(firestore, "users"), where("username", "==", username))
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty) {
                return showToast("Error", "User not found", "error")
            }
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setLoading(false)
        }
    }

    return {isLoading, getUserProfile, user, setUser}
}

export default useSearchUser