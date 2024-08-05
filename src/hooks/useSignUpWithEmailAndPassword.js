import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import useShowToast from './useShowToast';
import { useState } from 'react';
import useAuthStore from '../store/authStore';

function useSignUpWithEmailAndPassword() {
    const showToast = useShowToast();
    const toast = useToast();
    const [errorMessage, setErrorMessage] = useState(null);
    const loginUser = useAuthStore(state => state.login)
    const logoutUser = useAuthStore(state => state.logout)

    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill all the fields", "error", "top");
            setErrorMessage(error);
            return { success: false, error };
        }
        try {
            const newUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
            if (!newUser) {
                /*showToast("Error", "Email or username already in use", "error", "top");*/
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
                setErrorMessage(error);
                return { success: false, error };
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                };
            
                const userCreationPromise = new Promise(async (resolve, reject) => {
                    try {
                        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                        localStorage.setItem("user-info", JSON.stringify(userDoc));
                        loginUser(userDoc);
                        resolve("Account created successfully");
                    } catch (error) {
                        reject("Failed to create account");
                    }
                });
            
                toast.promise(userCreationPromise, {
                    success: { title: 'Success', description: 'Account created successfully', duration: 7000, isClosable: true, position: 'top' },
                    error: { title: 'Error', description: 'Failed to create account', duration: 9000, position: 'top' },
                    loading: { title: 'Creating Account', description: 'Please wait', position: 'top' },
                });

                return { success: true };
            }
        } catch (error) {
            /*showToast("Error", error.message, "error", "top");*/
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
            })

            setErrorMessage(error.message);
            return { success: false, error: error.message };
        }
    }

    return { signup, errorMessage };
}

export default useSignUpWithEmailAndPassword;