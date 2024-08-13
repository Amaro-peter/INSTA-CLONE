
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { useState } from 'react';
import {ref, getDownloadURL, uploadString} from 'firebase/storage';
import {doc, updateDoc} from 'firebase/firestore';
import {storage, firestore} from '../firebase/firebase';

function useEditProfile() {
    const[isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    const showToast = useShowToast();

    const editProfile = async(inputs, selectedFile) => {
        if(isUpdating || !authUser) return;
        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);
        let URL = ""
        try{
            if(selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }
            
            const updatedUser = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");
            /*const updatedFields = {};
            if(inputs.fullName !== authUser.fullName) {
                updatedFields.fullName = inputs.fullName;
            }
            if(inputs.username !== authUser.username) {
                updatedFields.username = inputs.username;
            }
            if(inputs.bio !== authUser.bio) {
                updatedFields.bio = inputs.bio;
            }
            if(URL && URL !== authUser.profilePicURL) {
                updatedFields.profilePicURL = URL;
            }

            if(Object.keys(updatedFields).length > 0) {
                const updatedUser = {
                    ...authUser,
                    ...updatedFields,
                }
                
            }*/
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    return{editProfile, isUpdating}
}

export default useEditProfile