import { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import { getDoc, doc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserProfileById = (userId) => {
  const[isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState(null)


  const showToast = useShowToast()

  useEffect(() => {
    const getUserProfileById = async () => {
        setIsLoading(true)
        setUserProfile(null)
        try{
            const userRef = await getDoc(doc(firestore, "users", userId))
            if(userRef.exists()) {
                setUserProfile(userRef.data())
            }
        } catch(error) {
            showToast("Error", error.message, "error")
        }finally {
            setIsLoading(false)
        }
    }
    getUserProfileById()
  }, [showToast, setUserProfile, userId])

  return {isLoading, userProfile, setUserProfile}
}

export default useGetUserProfileById