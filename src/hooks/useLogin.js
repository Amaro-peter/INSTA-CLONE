import { useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import {doc, getDoc} from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useState } from "react";  

function useLogin() {
    const toast = useToast();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    setLoading(true);
    setError(null);
    if(!inputs.email || !inputs.password) {
        toast({
            title: 'Error',
            description: 'Please fill all the fields',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: "top"
        });
        setError("Please fill all the fields");
        setLoading(false);
        return{sucess: false, error};
    }
    try {
        const userCred = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
        if(userCred) {
            const docRef = doc(firestore, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef);
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
            loginUser(docSnap.data());
        }
    } catch (error) {
        toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: "top"
        })
        setError(error.message);
        setLoading(false);
        return {success: false, error: error.message};
    }
    setLoading(false);
    return
  }
  return {loading, error, setError, login};
}

export default useLogin
