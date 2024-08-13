import { Flex, Image, Text } from "@chakra-ui/react"
import {auth, firestore} from "../../firebase/firebase";
import { useToast } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


function GoogleAuth({prefix}) {

  const toast = useToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try{
      let googleProvider = new GoogleAuthProvider();
      const newUser = await signInWithPopup(auth, googleProvider);
      if(!newUser && error) {
        toast({
          title: 'Error',
          description: "Error over here " + error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top"
        })
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if(userSnap.exists()) {
        //login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else{
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now()
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: "Error here " + error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
    }  
  }

  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}
    onClick={handleGoogleAuth}
    >
        <Image src="/google.png" w={5} cursor={"pointer"} alt='Google Logo' />
        <Text mx={2} color={"blue.500"}>
        {prefix} with Google
        </Text>
    </Flex>
  )
}

export default GoogleAuth;