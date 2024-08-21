import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthUser from '../store/authStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import usePostStore from '../store/postStore'

function usePostComment() {
  const[isComment, setIsComment] = useState(false)
  const showToast = useShowToast()
  const authUser = useAuthUser((state) => state.user)
  const addComment = usePostStore((state) => state.addComment)

    const handlePostComment = async (postId, comment) => {
        if(isComment) { //optimatization
            return
        }

        if(!authUser) {
            showToast("Error", "You need to be logged in to comment", "error")
            return
        }

        setIsComment(true)
        const newComment = {
            comment: comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId: postId,
        }

        try{
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment)
            })

            addComment(postId, newComment)

        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsComment(false)
        }
    }

    return {isComment, handlePostComment}
}

export default usePostComment