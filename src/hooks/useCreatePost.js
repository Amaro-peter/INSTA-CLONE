import useShowToast from "./useShowToast"
import { useState } from "react"
import useAuthUser from "../store/authStore"
import usePostStore from "../store/postStore"
import useUserProfileStore from "../store/userProfileStore"
import { useLocation } from "react-router-dom"
import {ref, getDownloadURL, uploadString} from 'firebase/storage';
import {addDoc, collection, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import {storage, firestore} from '../firebase/firebase';

function useCreatePost() {
    const showToast = useShowToast()
    const [isLoading, setIsLoading] = useState(false)
    const authUser = useAuthUser((state) => state.user)
    const createPost = usePostStore(state => state.createPost)
    const addPost = useUserProfileStore(state => state.addPost)
    const{pathname} = useLocation()

    const handleCreatePost = async (selectedFile, caption) => {
        if(!selectedFile) {
            throw new Error("Please select an image")
        }
        setIsLoading(true)
        const newPost = {
            caption: caption,
            likes:[],
            comments:[],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }

        try{
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost)
            const userDocRef = doc(firestore, "users", authUser.uid)
            const imageRef = ref(storage, `posts/${postDocRef.id}`)

            await updateDoc(userDocRef, {
                posts:arrayUnion(postDocRef.id)
            })
            await uploadString(imageRef, selectedFile, "data_url")
            const downloadURL = await getDownloadURL(imageRef)

            await updateDoc(postDocRef, {
                imageURL:downloadURL
            })

            newPost.imageURL = downloadURL

            createPost({...newPost, id:postDocRef.id})

            addPost({...newPost, id:postDocRef.id})

            showToast("Success", "Post created successfully", "success")


        } catch(error) {
            showToast("Error", error.message, "error")
        } finally{
            setIsLoading(false)
        }
    }
    return{isLoading, handleCreatePost}
}

export default useCreatePost