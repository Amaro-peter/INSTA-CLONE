import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef, useState } from "react";
import usePostStore from "../../store/postStore";

const CommentsModal = ({isOpen, onClose, post}) => {

    const addComment = usePostStore((state) => state.addComment)

    const {handlePostComment, isComment}= usePostComment()

    const commentRef = useRef(null)

    const commentsContainerRef = useRef(null)

    const [newCommentAdded, setNewCommentAdded] = useState(false)

    const handleSubmitComment = async (e) => {
        //do not refresh the page, it prevents it from doing this action
        e.preventDefault()
        await handlePostComment(post.id, commentRef.current.value)
        commentRef.current.value = ""
        setNewCommentAdded(true)

    }


    useEffect (() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight

        }
        if(newCommentAdded) {
            setTimeout(() => {
                scrollToBottom()
                setNewCommentAdded(false)
            }, 100)
        }
    }, [newCommentAdded])
        

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
            <ModalOverlay />
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}
                    ref={commentsContainerRef}
                    >
                        {post.comments.map(comment => (
                            <Comment key={comment.cId} comment={comment} />
                        ))}
                    </Flex>
                    <form onSubmit={handleSubmitComment} style={{marginTop: "2rem"}}>
                        <Input placeholder="Comment" size={"sm"} ref={commentRef} />
                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button type="submit" size={"sm"} ml={"auto"} my={4} isLoading={isComment}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>  
        </Modal>   
    )
}

export default CommentsModal;